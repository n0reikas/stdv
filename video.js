async function loadData() {
    let data = [];
    const response = await fetch('./data.json');
    data = await response.json();

    console.log(data);

    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    console.log(params);
    console.log(id);

    const item = data.find(i => String(i.id) === id);

    console.log(item);
    
    generateVideoPage(item);
}

function generateVideoPage(item) {
    const container = document.getElementById('container');

    const videoContainer = document.createElement('div');
    videoContainer.className = "video-container";

    const textContainer = document.createElement('div');
    textContainer.className = "text-container";

    const ytEmbed = document.createElement('iframe');
    //ytEmbed.width = "560";
    //ytEmbed.height = "315";
    ytEmbed.src = `https://www.youtube.com/embed/${item.videoId}`;
    ytEmbed.title = "YouTube video player";
    ytEmbed.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    ytEmbed.referrerpolicy = "strict-origin-when-cross-origin" ;
    ytEmbed.allowfullscreen = "true";
    ytEmbed.frameBorder = '0';

    const title = document.createElement('h1');
    title.textContent = item.title;
    title.className = "video-title";
    
    const authors = document.createElement('h3');
    authors.innerHTML = `<span style="font-size: 0.65em; color:#aaa">DIRECTED BY&nbsp;</span> ${item.authors}`;
    authors.className = "video-authors";

    const description = document.createElement('p');
    description.innerHTML = `${item.description}`;
    description.className = "video-description";

    container.appendChild(videoContainer);
    videoContainer.appendChild(ytEmbed);
    container.appendChild(textContainer);
    textContainer.appendChild(title);
    textContainer.appendChild(authors);
    textContainer.appendChild(description);
    

}

loadData();