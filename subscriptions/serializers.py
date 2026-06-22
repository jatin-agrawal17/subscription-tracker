from rest_framework import serializers
from .models import Subscription
from datetime import date,datetime
class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

        read_only_fields = [
            "User",
            "created_at"
        ]


class UpcomingRenewalSerializer(serializers.ModelSerializer):

    days_left = serializers.SerializerMethodField()

    class Meta:

        model = Subscription

        fields = [
            "service_name",
            "amount",
            "renewal_date",
            "days_left"
        ]

    def get_days_left(self,obj):

        return (
            obj.renewal_date - date.today()
        ).days
    



class TrialSerializer(serializers.ModelSerializer):

    days_left = serializers.SerializerMethodField()

    class Meta:

        model = Subscription

        fields = [
            "service_name",
            "trial_end_date",
            "days_left"
        ]

    def get_days_left(self,obj):

        return (
            obj.trial_end_date - date.today()
        ).days
    

# class UsageReportSerializer(serializers.ModelSerializer):

#     class Meta:

#         model = Subscription

#         fields = [
#             "service_name",
#             "last_used"
#         ]


# class UnusedSubscriptionSerializer(
#     serializers.ModelSerializer
# ):

#     days_unused = serializers.SerializerMethodField()

#     potential_saving = serializers.SerializerMethodField()

#     class Meta:

#         model = Subscription

#         fields = [

#             "service_name",

#             "days_unused",

#             "potential_saving"

#         ]

#     def get_days_unused(self,obj):

#         return (
#             datetime.now().date()
#             -
#             obj.last_used.date()
#         ).days

#     def get_potential_saving(self,obj):

#         return obj.amount   