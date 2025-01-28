from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Comment


@receiver(post_save, sender=Comment)
def update_reviews_on_save(sender, instance, **kwargs):
    instance.product.update_reviews_count()


@receiver(post_delete, sender=Comment)
def update_reviews_on_delete(sender, instance, **kwargs):
    instance.product.update_reviews_count()
