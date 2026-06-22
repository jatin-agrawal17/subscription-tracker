# subscriptions/urls.py

from rest_framework.routers import DefaultRouter

from .views import SubscriptionViewSet
# from .views import AnalyticsView
# from .views import CategoryAnalyticsView
# from .views import UpcomingRenewalsView,ExpiringTrialsView,UsageReportView,UnusedSubscriptionsView,SavingsSummaryView
# from .views import MarkUsedView
from .views import DashboardView
from django.urls import path
router = DefaultRouter()

router.register(
    "subscriptions",SubscriptionViewSet,basename="subscriptions"
)

urlpatterns = router.urls
urlpatterns += [

#     path(
#         "analytics/",
#         AnalyticsView.as_view(),
#         name="analytics"
#     ),
#     path(
#     "category-analytics/",
#     CategoryAnalyticsView.as_view(),
#     name="category-analytics"
# ),
# path(
#     "upcoming-renewals/",
#     UpcomingRenewalsView.as_view(),
#     name="upcoming-renewals"
# ),
# path(
#     "expiring-trials/",
#     ExpiringTrialsView.as_view(),
#     name="expiring-trials"
# ),
# path(
#     "mark-used/<int:pk>/",
#     MarkUsedView.as_view(),
#     name="mark-used"
# ),
# path(
#     "usage-report/",
#     UsageReportView.as_view(),
#     name="usage-report"
# ),
# path(
#     "unused-subscriptions/",
#     UnusedSubscriptionsView.as_view(),
#     name="unused-subscriptions"
# ),
# path(
#     "savings-summary/",
#     SavingsSummaryView.as_view(),
#     name="savings-summary"
# ),
path(
    "dashboard/",
    DashboardView.as_view(),
    name="dashboard"
),

]