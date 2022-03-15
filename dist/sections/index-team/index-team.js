;
(function() {
  const teamBlock = q('.index-team');

  if (teamBlock) {
    const teamList = q('.index-team__team', teamBlock);
    const loadmoreBtn = q('.index-team__loadmore', teamBlock);
    const totalteam = teamList.getAttribute('data-total-team');
    const postsPerPage = teamList.getAttribute('data-team-numberposts');

    teamBlock.addEventListener('click', function(e) {
      const target = e.target;

      if (target.closest('.index-team__loadmore')) {
        console.log('click on loadmore');
        let existsItems = qa('.teammate', teamBlock);
        const excludeItems = [];

        for (let i = existsItems.length - 1; i >= 0; i--) {
          excludeItems[excludeItems.length] = existsItems[i].getAttribute('data-id');
        }

        document.body.classList.add('loading');
        loadmoreBtn.blur();
        loadmoreBtn.setAttribute('tabindex', '-1');

        fetch(siteUrl + '/wp-json/wp/v2/teammates?per_page=' + postsPerPage + '&exclude=' + excludeItems)
          .then(function(response) {
            if (response.ok) {
              return response.text();
            } else {
              console.log('Ошибка ' + response.status + ' (' + response.statusText + ')');
              errorPopup && errorPopup.openPopup();
            }
          })
          .then(function(response) {
            response = JSON.parse(response);
            console.log(response);
            response.forEach(function(post) {
              teamList.insertAdjacentHTML('beforeend', post.html);
            });
            existsItems = qa('.teammate', teamBlock);
            if (existsItems.length >= totalteam) {
              loadmoreBtn.classList.add('hide');
            }
          })
          .catch(function(err) {
            console.log(err);
            errorPopup && errorPopup.openPopup();
          })
          .finally(function() {
            document.body.classList.remove('loading');
            loadmoreBtn.removeAttribute('tabindex');
          });

      } else if (target.closest('.teammate')) {
        console.log('click on teammate');
      }
    });
  }

})();