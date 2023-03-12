const bridge = vkBridge;
vkBridge
    .send("VKWebAppInit")
    .then((data) => {
        if (data.result) {
            bridge.data = JSON.parse('{"' + decodeURI(window.location.href).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        } else {
            console.log("Ошибка инициализации vkBridge");
        }
    })
    .catch((error) => {
        console.log(error);
    });

bridge.active = () => bridge.data != null;

const unityWrapper = {
    ShareProgress: function (value) {
        if (!bridge.active()) return;

        bridge
            .send('VKWebAppShowWallPostBox', {
                message: `Я достиг числа ${value} в игре [https://vk.com/app${bridge.data.api_id}|NumberUP]! А вам слабо?`,
                attachment: `https://vk.com/app${bridge.data.api_id}`,
                owner_id: bridge.data.viewer_id
            })
            .then((data) => {
                console.log(`Идентификатор записи: ${data.post_id}`);
            })
            .catch((e) => {
                console.log("Ошибка!", e);
            })
    },
    AchievmentGet: function (name, description) {
        console.log(`${name}: ${description}`);
        achievementName.innerHTML = name;
        achievementDescr.innerHTML = description;
        achievements.removeAttribute("hidden");
    },
    ShareAchievement: function () {
        if (!bridge.active()) return;

        bridge
            .send('VKWebAppShowWallPostBox', {
                message: `Я получил достижение "${achievementName.innerHTML}" в игре [https://vk.com/app${bridge.data.api_id}|NumberUP]! А вам слабо?`,
                attachment: `https://vk.com/app${bridge.data.api_id}`,
                owner_id: bridge.data.viewer_id
            })
            .then((data) => {
                console.log(`Идентификатор записи: ${data.post_id}`);
            })
            .catch((e) => {
                console.log("Ошибка!", e);
            })
    }
}