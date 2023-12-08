const hostUrl = 'http://localhost:8080';
const uploadTicketApiUrl = hostUrl + '/api/upload/url';
const nofityUploadApiUrl = hostUrl + '/api/upload/done';
const videoApiUrl = hostUrl + '/api/video';
const videoThumbnailApiUrl = hostUrl + '/api/video/thumbnail';
const allVideoStatusApiUrl = videoApiUrl + "/status-all"

function createElement(tag, child) {
    const divNode = document.createElement(tag);
    if (typeof child === 'string') {
        child = document.createTextNode(child);
    }
    divNode.appendChild(child);
    return divNode;
}
