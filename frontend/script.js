const data = null;

$(document).ready(() => {

  function addLoader() {
    $('.container').append('<p class="loader">Loading...</p>')
  }
  function removeLoader() {
    $('.loader').remove()
  }



  $(".getBtn").click(() => {
    const getInfo = async () => {

      addLoader()


      const url = $("#videoId").val();
      await axios
        .post("http://localhost:3000/download", {
          ytUrl: url,
        })
        .then((response) => addDataInUI(response.data.data.data))
        .catch((err) => console.error(err));
    };
    getInfo();

    function addDataInUI(data) {

      function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
    
        const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        return formattedTime;
      }


      $('.details').remove()
      $('.formats').remove()

      let li = ''
      for (let i = 0; i < data?.formats.length; i++) {
        let json_obj = data?.formats[i];
            li += `
            <li>Resolution : ${json_obj.resolution}p |
                FPS : ${json_obj.fps} |
                Download : <a href=${json_obj.url} downlaod target='_blank'>Link</a></li>
            `
        }

      $('.container').append(`
        <div class="details">
        <h1 class="title"><strong>Title:<strong/> ${data?.title}</h1>
        <p><strong>Author:</strong> ${data?.author}</p>
        <p><strong>Category:</strong> ${data?.category}</p>
        <p><strong>Published Date:</strong> ${data?.publishedDate}</p>
        <p><strong>Views:</strong> ${data?.views}</p>
        <p><strong>Length (Seconds):</strong> ${formatTime(data?.lenghtSecond)}</p>
        <p><strong>Age Restricted:</strong> ${data?.age_restricted}</p>
        <p><strong>Family Safe:</strong> ${data?.isFamilySafe}</p>
        <p><strong>Live:</strong> ${data?.isLive}</p>
        <p><strong>Private:</strong> ${data?.isPrivate}</p>
      </div>
      <div class="formats">
        <h2>Formats:</h2>
        <ul>
          ${li}          
        </ul>
      </div>
    `);
    removeLoader()
    }
  });
});
