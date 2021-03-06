function downloadImg(elLink) {
  console.log('gCanvas:', gCanvas);
  var imgContent = gCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}

function uploadImg(elForm, ev) {
  ev.preventDefault();
  document.getElementById('imgData').value = gCanvas.toDataURL('image/jpeg');
  function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    const shareEl = document.querySelector('.share-container');
    shareEl.classList.add('share-grid');
    shareEl.innerHTML = `
        <a class="btn href="http://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share
        </a>`;
  }
  doUploadImg(elForm, onSuccess);
}
function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);
  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then(function (res) {
      return res.text();
    })
    .then(onSuccess)
    .catch(function (err) {
      console.error(err);
    });
}
