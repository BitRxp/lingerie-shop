from django.contrib import admin

from .models import (
    Color,
    Product,
    ProductImage,
    Brand,
    Size,
    Collection
)

admin.site.register(Color)
admin.site.register(ProductImage)
admin.site.register(Brand)
admin.site.register(Size)
admin.site.register(Collection)


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ("image", "is_main")
    readonly_fields = ("id",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    list_display = ("title", "price", "is_sales", "rating")
    search_fields = ("title", "code")
    list_filter = ("is_sales", "rating")
