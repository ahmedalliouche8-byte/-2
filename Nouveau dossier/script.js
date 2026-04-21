let matches = {
    today: [],
    yesterday: [],
    tomorrow: []
};

function addMatch() {
    let home = document.getElementById("home").value;
    let away = document.getElementById("away").value;
    let time = document.getElementById("time").value;
    let day = document.getElementById("day").value;
    let link = document.getElementById("link").value;

    matches[day].push({
        home,
        away,
        time,
        link,
        watched: false
    });

    showTab(day);
}

// ▶ مشاهدة
function watch(link) {
    document.getElementById("player").src = link;
}

// ✔ تم المشاهدة
function markWatched(day, index) {
    matches[day][index].watched = true;
    showTab(day);
}

// 🗑 حذف
function deleteMatch(day, index) {
    matches[day].splice(index, 1);
    showTab(day);
}

// 📺 عرض
function showTab(tab) {
    document.querySelectorAll("div[id]").forEach(d => {
        if(["today","yesterday","tomorrow"].includes(d.id))
            d.style.display = "none";
    });

    let container = document.getElementById(tab);
    container.style.display = "block";
    container.innerHTML = "";

    matches[tab].forEach((m, i) => {
        container.innerHTML += `
        <div class="match ${m.watched ? 'done' : ''}">
            <div>${m.home} 🆚 ${m.away}</div>
            <div>${m.time}</div>

            <div class="actions">
                <button onclick="watch('${m.link}')">▶ مشاهدة</button>
                <button onclick="markWatched('${tab}',${i})">✔ تم المشاهدة</button>
                <button onclick="deleteMatch('${tab}',${i})">❌ حذف</button>
            </div>
        </div>`;
    });
}

showTab("today");