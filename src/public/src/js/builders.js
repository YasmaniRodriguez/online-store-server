function buildHtmlMessages(message, align) {
	return `
    <li class="message-item ${align}">
        <div>
            <div>
                <img 
                    src="http://localhost:8080/src/${message.author.avatar}"
                    alt=""
                />
                <p>${message.author.email}</p>
                <p>${message.updatedAt}</p>
            </div>
            <span class="material-icons-outlined">more_vert</span>
        </div>
        <p>${message.message}</p>
    </li>
    `;
}

export { buildHtmlMessages };
