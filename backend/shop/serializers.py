from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Address

from .models import (
    Color,
    Size,
    Brand,
    Product,
    ProductImage,
    Collection,
    Category,
    Order,
    OrderItem,
    Cart,
    CartItem
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

class ProductUploadImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("id", "product", "image", "is_main")

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ("id", "name", "image")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


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
    category = serializers.SlugRelatedField(
        many=True,
        slug_field="name",
        queryset=Collection.objects.all(),
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
            "category",
            "price",
            "images",
            "reviews",
            "is_sales",
            "rating",
            "code",
            "available"
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
        fields = ("id", "title", "images", "price", "available",)


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer()

    class Meta:
        model = CartItem
        fields = ("id", "product", "quantity")


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ("id", "items", "created_at")


class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)

    def validate_product_id(self, value):
        if not Product.objects.filter(id=value, available=True).exists():
            raise ValidationError("Product not available")
        return value


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer()

    class Meta:
        model = OrderItem
        fields = ("id", "product", "quantity", "price")

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["postal_code", "country", "city", "street_address", "comment"]


class OrderSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", read_only=True)
    delivery_address = AddressSerializer()

    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "first_name",
            "last_name",
            "email",
            "phone",
            "total_price",
            "status",
            "delivery_method",
            "delivery_address",
            "delivery_cost",
            "payment_method",
            "created_at",
        ]
        read_only_fields = ["user", "total_price", "status", "created_at"]

    def create(self, validated_data):
        address_data = validated_data.pop("delivery_address")
        address = Address.objects.create(**address_data)  # Создаем Address
        order = Order.objects.create(delivery_address=address, **validated_data)  # Создаем Order
        return order
    def validate(self, data):
        if data.get("delivery_method") in ["courier", "international"] and not data.get("delivery_address"):
            raise serializers.ValidationError("Delivery address is required for courier or international delivery.")
        return data


class OrderContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["first_name", "last_name", "email", "phone"]


class OrderDeliverySerializer(serializers.ModelSerializer):
    delivery_address = AddressSerializer()
    class Meta:
        model = Order
        fields = ["delivery_method", "delivery_address", "delivery_cost"]


class OrderPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["payment_method"]