from django.shortcuts import render

# Create your views here.
from django.db.models import Sum
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializers import SubscriptionSerializer
from .models import Subscription
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import date, timedelta
from .serializers import UpcomingRenewalSerializer,TrialSerializer
from django.utils import timezone
from rest_framework import status
from django.db.models import Q

class SubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Subscription.objects.filter(User = self.request.user)
    
    def perform_create(self,serializer):
        serializer.save(
            User=self.request.user
        )



# class AnalyticsView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self,request):

#         subscriptions = Subscription.objects.filter(
#             User=request.user
#         )

#         monthly_spend = subscriptions.aggregate(
#             total=Sum("amount")
#         )["total"] or 0

#         total_subscriptions = subscriptions.count()

#         renewing_soon = subscriptions.filter(
#             renewal_date__gte=date.today(),
#             renewal_date__lte=date.today()+timedelta(days=7)
#         ).count()

#         return Response({

#             "monthly_spend": monthly_spend,

#             "yearly_spend": monthly_spend * 12,

#             "total_subscriptions": total_subscriptions,

#             "renewing_soon": renewing_soon

#         })
    


# class CategoryAnalyticsView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self,request):

#         category_data = (

#             Subscription.objects.filter(
#                 User=request.user
#             )

#             .values("category")

#             .annotate(
#                 total=Sum("amount")
#             )

#             .order_by("-total")

#         )

#         return Response(category_data)
    


# class UpcomingRenewalsView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self,request):

#         subscriptions = Subscription.objects.filter(

#             User=request.user,

#             renewal_date__gte=date.today(),

#             renewal_date__lte=date.today() + timedelta(days=7)

#         ).order_by("renewal_date")

#         serializer = UpcomingRenewalSerializer(
#             subscriptions,
#             many=True
#         )

#         return Response(serializer.data)
    




# class ExpiringTrialsView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self,request):

#         trials = Subscription.objects.filter(

#             User=request.user,

#             is_trial=True,

#             trial_end_date__gte=date.today(),

#             trial_end_date__lte=date.today()+timedelta(days=7)

#         ).order_by("trial_end_date")

#         serializer = TrialSerializer(
#             trials,
#             many=True
#         )

#         return Response(serializer.data)
    



# class MarkUsedView(APIView):

#     permission_classes = [IsAuthenticated]

#     def post(self,request,pk):

#         try:

#             subscription = Subscription.objects.get(
#                 id=pk,
#                 User=request.user
#             )

#         except Subscription.DoesNotExist:

#             return Response(
#                 {
#                     "error":"Subscription not found"
#                 },
#                 status=status.HTTP_404_NOT_FOUND
#             )

#         subscription.last_used = timezone.now()

#         subscription.save()

#         return Response(
#             {
#                 "message":"Usage updated"
#             }
#         )



# class UsageReportView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self,request):

#         subscriptions = Subscription.objects.filter(
#             User=request.user
#         )

#         serializer = UsageReportSerializer(
#             subscriptions,
#             many=True
#         )

#         return Response(serializer.data)
    


# class UnusedSubscriptionsView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self,request):

#         threshold = (
#             timezone.now()
#             -
#             timedelta(days=30)
#         )

#         subscriptions = Subscription.objects.filter(

#             User=request.user,

#             last_used__lt=threshold

#         )

#         serializer = (
#             UnusedSubscriptionSerializer(
#                 subscriptions,
#                 many=True
#             )
#         )

#         return Response(
#             serializer.data
#         )
    

# class SavingsSummaryView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self,request):

#         threshold = (
#             timezone.now()
#             -
#             timedelta(days=30)
#         )

#         unused_subscriptions = Subscription.objects.filter(

#             User=request.user,

#             last_used__lt=threshold

#         )

#         monthly_savings = (

#             unused_subscriptions.aggregate(
#                 total=Sum("amount")
#             )["total"]

#             or

#             0
#         )

#         return Response({

#             "unused_subscriptions":
#             unused_subscriptions.count(),

#             "monthly_savings":
#             monthly_savings,

#             "yearly_savings":
#             monthly_savings * 12

#         })
    


class DashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request):

        subscriptions = Subscription.objects.filter(
            User=request.user
        )
        monthly_spend = 0

        yearly_spend = 0

        for sub in subscriptions:

            if sub.billing_cycle == "Monthly":

                monthly_spend += float(
                    sub.amount
                )

                yearly_spend += float(
                    sub.amount
                ) * 12

            elif sub.billing_cycle == "Quarterly":

                monthly_spend += float(
                    sub.amount
                ) / 3

                yearly_spend += float(
                    sub.amount
                ) * 4

            elif sub.billing_cycle == "Half-Yearly":

                monthly_spend += float(
                    sub.amount
                ) / 6

                yearly_spend += float(
                    sub.amount
                ) * 2

            elif sub.billing_cycle == "Yearly":

                monthly_spend += float(
                    sub.amount
                ) / 12

                yearly_spend += float(
                    sub.amount
                )

            else:

                monthly_spend += float(
                    sub.amount
                )

                yearly_spend += float(
                    sub.amount
                ) * 12

        upcoming_renewals = Subscription.objects.filter(

            User=request.user,

            renewal_date__gte=date.today(),

            renewal_date__lte=date.today()+timedelta(days=7)

        )

        expiring_trials = Subscription.objects.filter(

            User=request.user,

            is_trial=True,

            trial_end_date__gte=date.today(),

            trial_end_date__lte=date.today()+timedelta(days=7)

        )

        threshold = (
            timezone.now()
            -
            timedelta(days=30)
        )

        unused_subscriptions = Subscription.objects.filter(

            User=request.user

        ).filter(

            Q(last_used__lt=threshold)

            |

            Q(last_used__isnull=True)

        )
        
        trial_subscriptions = Subscription.objects.filter(

            User=request.user,

            is_trial=True).count()
        paid_subscriptions = Subscription.objects.filter(

            User=request.user,

            is_trial=False

            ).count()

        return Response({

            "monthly_spend":
            round(
                monthly_spend,
                2
            ),

            "yearly_spend":
            round(
                yearly_spend,
                2
            ),

            "total_subscriptions":
            subscriptions.count(),

            "trial_subscriptions":
            trial_subscriptions,

            "paid_subscriptions":
            paid_subscriptions,

            "unused_subscriptions":
            unused_subscriptions.count(),

            "monthly_savings":
            (
                unused_subscriptions.aggregate(
                    total=Sum("amount")
                )["total"]
                or
                0
            ),

            "yearly_savings":
            (
                (
                    unused_subscriptions.aggregate(
                        total=Sum("amount")
                    )["total"]
                    or
                    0
                )
                * 12
            ),

            "upcoming_renewals":
            UpcomingRenewalSerializer(
                upcoming_renewals,
                many=True
            ).data,

            "expiring_trials":
            TrialSerializer(
                expiring_trials,
                many=True
            ).data

        })