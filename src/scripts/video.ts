document
  .querySelectorAll<HTMLButtonElement>('[data-youtube]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.youtube;
      const container = button.closest('[data-video]');
      if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id) || !container) return;
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=0`;
      frame.title = button.dataset.videoTitle ?? 'Project video';
      frame.allow = 'fullscreen; picture-in-picture';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.allowFullscreen = true;
      frame.tabIndex = 0;
      container.replaceChildren(frame);
      frame.focus();
    });
  });
