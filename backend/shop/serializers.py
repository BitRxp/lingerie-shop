from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import (
    Color,
    Size,
    Brand,
    Product,
    ProductImage, Collection
)


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ("id", "name")


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ("id", "name")


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ("id", "name")


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("id", "image", "is_main")


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ("id", "name", "image")


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, required=False)
    collection = serializers.SlugRelatedField(
        many=True,
        slug_field="name",
        queryset=Collection.objects.all(),
    )
    color = serializers.SlugRelatedField(
        many=True,
        slug_field="name",
        queryset=Color.objects.all(),
    )
    size = serializers.SlugRelatedField(
        many=True,
        slug_field="name",
        queryset=Size.objects.all(),
    )
    brand = serializers.SlugRelatedField(
        many=True,
        slug_field="name",
        queryset=Brand.objects.all(),
    )

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "color",
            "brand",
            "size",
            "collection",
            "description",
            "price",
            "images",
            "reviews",
            "is_sales",
            "rating",
            "code",
        )

    def create(self, validated_data):
        images_data = validated_data.pop("images", [])
        product = Product.objects.create(**validated_data)
        for image_data in images_data:
            ProductImage.objects.create(product=product, **image_data)
        return product

    def update(self, instance, validated_data):
        images_data = validated_data.pop("images", [])
        instance = super().update(instance, validated_data)

        for image_data in images_data:
            ProductImage.objects.update_or_create(
                product=instance,
                id=image_data.get("id"),
                defaults=image_data
            )
        return instance


class ProductListSerializer(ProductSerializer):
    class Meta:
        model = Product
        fields = ("id", "title", "images", "price")
