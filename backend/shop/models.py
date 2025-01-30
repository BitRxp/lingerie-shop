import os
import uuid

from django.db import models
from django.utils.text import slugify

from lingerie_shop import settings


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
    return os.path.join("collections/", filename)


class Collection(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to=collection_image_file_path)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to=collection_image_file_path, null=True)

    def __str__(self):
        return self.name


class Address(models.Model):
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    street_address = models.CharField(max_length=255)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.street_address}, {self.city}, {self.country} ({self.postal_code})"


class Order(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders",
        null=True,
        blank=True,
    )
    session_key = models.CharField(max_length=40, null=True, blank=True)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=[("pending", "Pending"), ("completed", "Completed")],
                              default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    delivery_method = models.CharField(
        max_length=50,
        choices=[
            ("courier", "Courier delivery"),
            ("post_office", "Delivery to the post office"),
            ("international", "International delivery"),
        ],
    )
    delivery_address = models.OneToOneField(
        "Address",
        on_delete=models.CASCADE,
        null=False,
        related_name="order"
    )
    delivery_cost = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    payment_method = models.CharField(
        max_length=20,
        choices=[
            ("credit_card", "Credit Card"),
            ("apple_pay", "Apple Pay"),
            ("google_pay", "Google Pay"),
            ("cash", "Cash"),
        ],
    )
    def __str__(self):
        return (f"Order {self.id} by"
                f" {self.user.first_name} {self.user.last_name}")


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.title} - {self.quantity} in Order {self.order.id}"


class Cart(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="cart",
    )
    session_key = models.CharField(
        max_length=40,
        null=True,
        blank=True,
        unique=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.title} - {self.quantity}"


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
    code = models.CharField(
        max_length=10,
        unique=True,
        blank=True,
        null=True
    )
    available = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = str(uuid.uuid4())[:8].upper()
        super().save(*args, **kwargs)

    def average_rating(self):
        comments = self.comments.all()
        if comments:
            return round(sum(comment.rating for comment in comments) / len(comments), 1)
        return None

    def update_reviews_count(self):
        self.reviews = self.comments.count()
        self.save()

    def __str__(self):
        return f"{self.title} ({self.code})"


def product_image_file_path(instance, filename):
    extension = os.path.splitext(filename)[1]
    product_title = instance.product.title if instance.product else "default"
    filename = f"{slugify(product_title)}-{uuid.uuid4()}{extension}"
    return os.path.join("products/", filename)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to=product_image_file_path)
    is_main = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.product.title}"


class Comment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        related_name="comments",
        on_delete=models.CASCADE
    )
    text = models.TextField()
    rating = models.PositiveIntegerField(
        default=5,
        choices=[(i, i) for i in range(1, 6)]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user} on {self.product.title}"
