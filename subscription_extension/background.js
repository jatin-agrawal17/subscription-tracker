console.log("chrome =", chrome);
console.log("runtime =", chrome.runtime);
const SERVICE_URLS = {
    "Netflix": "https://www.netflix.com",
    "Netfilx": "https://www.netflix.com",

    "Spotify": "https://www.spotify.com",

    "YouTube Premium": "https://www.youtube.com",
    "YouTube Music": "https://music.youtube.com",

    "Amazon Prime": "https://www.primevideo.com",
    "Prime Video": "https://www.primevideo.com",

    "Disney+": "https://www.disneyplus.com",
    "Hotstar": "https://www.hotstar.com",

    "SonyLIV": "https://www.sonyliv.com",

    "Zee5": "https://www.zee5.com",

    "JioCinema": "https://www.jiocinema.com",

    "Apple TV+": "https://tv.apple.com",

    "Canva": "https://www.canva.com",

    "ChatGPT": "https://chatgpt.com",
    "ChatGPT Plus": "https://chatgpt.com",

    "Claude": "https://claude.ai",

    "Gemini": "https://gemini.google.com",

    "GitHub Copilot": "https://github.com/features/copilot",

    "Notion": "https://www.notion.so",

    "Figma": "https://www.figma.com",

    "Adobe Creative Cloud": "https://www.adobe.com",

    "Adobe Photoshop": "https://www.adobe.com",

    "Microsoft 365": "https://www.microsoft.com/microsoft-365",

    "Google One": "https://one.google.com",

    "Dropbox": "https://www.dropbox.com",

    "LinkedIn Premium": "https://www.linkedin.com",

    "Coursera": "https://www.coursera.org",

    "Udemy": "https://www.udemy.com",

    "LeetCode Premium": "https://leetcode.com",

    "GeeksforGeeks Premium": "https://www.geeksforgeeks.org",

    "Medium Membership": "https://medium.com",

    "X Premium": "https://x.com",

    "Crunchyroll": "https://www.crunchyroll.com",

    "Kaspersky": "https://www.kaspersky.com",

    "Norton": "https://us.norton.com",

    "ExpressVPN": "https://www.expressvpn.com",

    "NordVPN": "https://nordvpn.com",

    "Zoom Pro": "https://zoom.us",

    "Slack Pro": "https://slack.com",

    "Grammarly Premium": "https://www.grammarly.com"
};

function scheduleDailyAlarm() {

    chrome.alarms.clearAll(() => {

        const now = new Date();

        const nextRun = new Date();

        // Daily at 10:00 AM
        nextRun.setHours(10, 0, 0, 0);

        if (nextRun <= now) {
            nextRun.setDate(nextRun.getDate() + 1);
        }

        chrome.alarms.create(
            "subscriptionReminder",
            {
                when: nextRun.getTime(),
                periodInMinutes: 1440
            }
        );

        console.log("Daily reminder scheduled");
    });
}

chrome.runtime.onInstalled.addListener(() => {
    scheduleDailyAlarm();
});

chrome.runtime.onStartup.addListener(() => {
    scheduleDailyAlarm();
});

chrome.alarms.onAlarm.addListener(async (alarm) => {

    if (alarm.name !== "subscriptionReminder") {
        return;
    }

    chrome.storage.local.get(
        ["access"],
        async (result) => {

            if (!result.access) {
                return;
            }

            try {

                const response = await fetch(
                    "https://subscription-tracker-api-s7b3.onrender.com/api/v1/subscriptions/",
                    {
                        headers: {
                            Authorization:
                                "Bearer " + result.access
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch subscriptions"
                    );
                }

                const subscriptions =
                    await response.json();

                const today = new Date();

                subscriptions.forEach((sub) => {

                    const targetDate =
                        sub.is_trial
                            ? sub.trial_end_date
                            : sub.renewal_date;

                    if (!targetDate) {
                        return;
                    }

                    const diffDays =
                        Math.ceil(
                            (
                                new Date(targetDate) -
                                today
                            ) /
                            (
                                1000 *
                                60 *
                                60 *
                                24
                            )
                        );

                    // Notify for last 5 days
                    if (
                        diffDays > 0 &&
                        diffDays <= 5
                    ) {

                        chrome.notifications.create(
                            `renewal_${sub.service_name}`,
                            {
                                type: "basic",
                                iconUrl: "icons/icon128.png",
                                title: "Subscription Guardian",
                                message:
                                    `${sub.service_name} renewal due in ${diffDays} day(s).\n` +
                                    `Renewal Date: ${targetDate}`
                            }
                        );
                    }
                });

            } catch (error) {

                console.error(
                    "Reminder Error:",
                    error
                );
            }
        }
    );
});

chrome.notifications.onClicked.addListener(
    (notificationId) => {

        if (
            !notificationId.startsWith(
                "renewal_"
            )
        ) {
            return;
        }

        const serviceName =
            notificationId.replace(
                "renewal_",
                ""
            );

        if (
            SERVICE_URLS[
                serviceName
            ]
        ) {

            chrome.tabs.create({
                url:
                    SERVICE_URLS[
                        serviceName
                    ]
            });
        }
    }
);