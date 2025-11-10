const imageSrc = 'placeholder-image.jpg';


function toggleNav() {
    let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    var nav = document.getElementById("navLinks");
    if (nav.style.display === "block") {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }
    var logo = document.getElementById("logo");
    if (logo.style.display === "block") {
        logo.style.display = "none";
    } else {
        logo.style.display = "block";
    }

    if (isIOS) {
        if (nav.style.display === "block") {
            document.body.style.position = 'fixed';
        } else {
            document.body.style.position = '';
        }
    } else {
        if (nav.style.display === "block") {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

async function loadData() {
    let data = [];
    const response = await fetch('./data.json');
    data = await response.json();
    displayImages(data);
}

async function getThumbnailName(item) {
    const ids = [
        "maxresdefault.jpg",
        "hq720.jpg",
        "sddefault.jpg",
        "hqdefault.jpg",
        "mqdefault.jpg",
        "default.jpg"
    ]   

    for (const name of ids) {
        const url = `https://img.youtube.com/vi/${item.videoId}/${name}`;
        const res = await fetch(url);
        if (res.ok && res.headers.get("content-type").startsWith("image")) {
            return url;
        }
    }
    return null;
}

async function displayImages(data) {
    const gallery = document.getElementById('gallery');

    for (const item of data) {
        const thumbnail = await getThumbnailName(item);
        const link = document.createElement('a');
        link.href = `video.html?id=${encodeURIComponent(item.id)}`;
        link.title = item.title;

        const wrapper = document.createElement('div');
        wrapper.className = "image-item";

        const img = document.createElement('img');
        img.src = thumbnail;
        img.alt = item.title;
        img.style.height = item.scale;
        img.style.width = item.scale;

        const overlay = document.createElement('div');
        overlay.className = "overlay";
        overlay.innerHTML = `<span class="title">${item.title}</span>`;

        wrapper.appendChild(img);
        wrapper.appendChild(overlay);
        link.appendChild(wrapper);
        gallery.appendChild(link);
    }
}



loadData();