import Route from '@ember/routing/route';

export default class extends Route {
  redirect() {
    this.replaceWith('blog.post', 1, { queryParams: { lang: 'English' } });
  }
}
