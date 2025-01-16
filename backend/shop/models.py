import os
import uuid

from django.db import models
from django.forms import BooleanField
from django.utils.text import slugify


class Color(models.Model):
    name = models.CharField(max_length=50, unique=True, null=False)

    def __str__(self):
        return self.name


class Size(models.Model):
    name = models.CharField(max_length=10, unique=True, null=False)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


def collection_image_file_path(instance, filename):
    extension = os.path.splitext(filename)[1]
    collection_name = slugify(instance.name)
    filename = f"{collection_name}-{uuid.uuid4()}{extension}"
    return os.path.join("uploads/collections/", filename)


class Collection(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to=collection_image_file_path)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    title = models.CharField(max_length=150, unique=True, null=False)
    color = models.ManyToManyField("Color", blank=True)
    size = models.ManyToManyField("Size", blank=True)
    collection = models.ManyToManyField("Collection", blank=True)
    description = models.TextField(null=False)
    category = models.ManyToManyField("Category", blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    reviews = models.IntegerField(default=0)
    is_sales = models.BooleanField(default=False)
    rating = models.FloatField(null=True, blank=True)
    brand = models.ManyToManyField("Brand", blank=True)
    code = models.CharField(max_length=10, unique=True, blank=True, null=True)
    available = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = str(uuid.uuid4())[:8].upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.code})"


def product_image_file_path(instance, filename):
    extension = os.path.splitext(filename)[1]
    product_title = instance.product.title if instance.product else "default"
    filename = f"{slugify(product_title)}-{uuid.uuid4()}{extension}"
    return os.path.join("uploads/products/", filename)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to=product_image_file_path)
    is_main = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.product.title}"
