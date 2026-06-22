from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Subscription(models.Model):
    User = models.ForeignKey(User,on_delete=models.CASCADE, related_name='subscriptions')
    service_name = models.CharField(max_length=100)
    amount = models.DecimalField(
    max_digits=10,
    decimal_places=2,
    null=True,
    blank=True
)
    renewal_date = models.DateField(
        null=True,
        blank=True
    )

    billing_cycle = models.CharField(
        max_length=20,
        null=True,
        blank=True
    )
    category = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    is_trial = models.BooleanField(default=False)
    trial_end_date = models.DateField(null=True,blank=True)
    last_used = models.DateTimeField(null=True,blank=True)

    def __str__(self):
        return self.service_name