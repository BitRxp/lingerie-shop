import django_filters
from .models import (
    Product,
    Brand,
    Collection,
    Category
)


class ProductFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="gte"
    )
    price_max = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="lte"
    )
    brand = django_filters.ModelMultipleChoiceFilter(
        queryset=Brand.objects.all(),
        field_name="brand",
    )
    collection = django_filters.ModelMultipleChoiceFilter(
        queryset=Collection.objects.all(),
        field_name="collection",
    )
    category = django_filters.ModelMultipleChoiceFilter(
        queryset=Category.objects.all(),
        field_name="category",
    )
    available = django_filters.BooleanFilter(field_name="is_available")
    is_sales = django_filters.BooleanFilter(field_name="is_sales")

    class Meta:
        model = Product
        fields = ["price_min",
                  "price_max",
                  "brand",
                  "collection",
                  "category",
                  "available",
                  "is_sales"
                  ]
