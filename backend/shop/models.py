import os
import uuid

from django.db import models
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


def product_image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.title)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads/products/", filename)


class Product(models.Model):
    title = models.CharField(max_length=150, unique=True, null=False)
    color = models.ManyToManyField('Color', blank=True)
    size = models.ManyToManyField('Size', blank=True)
    description = models.TextField(null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    reviews = models.IntegerField(default=0)
    is_sales = models.BooleanField(default=False)
    rating = models.FloatField(null=True, blank=True)
    brand = models.ManyToManyField('Brand', blank=True)  # Зв'язок із Brand
    code = models.CharField(max_length=10, unique=True, blank=True, null=True)  # Унікальний код продукту



    def save(self, *args, **kwargs):
        if not self.code:
            self.code = str(uuid.uuid4())[:8].upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.code})"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to=product_image_file_path)
    is_main = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.product.title}"