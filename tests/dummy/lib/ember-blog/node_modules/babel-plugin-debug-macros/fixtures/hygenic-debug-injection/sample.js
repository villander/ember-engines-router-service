import { deprecate } from '@ember/debug-tools';
import bar from 'something';

if (bar()) {
  const DEBUG = 'hahah';
  deprecate('This is deprecated', true, {
    until: '3.0.0',
    id: 'a-thing',
    url: 'http://example.com'
  });
}