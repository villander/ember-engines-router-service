let a;

if (false
/* FEATURE_A */
) {
  a = () => console.log('hello');
} else if (true
/* FEATURE_B */
) {
  a = () => console.log('bye');
}

if (!false
/* FEATURE_A */
) {
  console.log('stuff');
}

a = false
/* FEATURE_A */
? 'hello' : 'bye';

if (false
/* FEATURE_A */
&& window.foo && window.bar) {
  console.log('wheeee');
}