import _ from 'lodash';
import p from './p'

if (process.env.NODE_ENV !== 'production') {
    console.log('it is dev development!!!!  ');
}

function component() {
    let element = document.createElement('pre');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    const br = document.createElement('br');
    element.appendChild(br);

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and look at the console!!!!';
    element.appendChild(btn);

    btn.onclick = e => {
        import(/*webpackChunkName:"print"*/'./print').then(m => {
            const print = m.default;
            print();
        });
    };
    p.bind(null, "hello fuck shit!");

    return element;
}

document.body.appendChild(component());

// if (module.hot) {
//     module.hot.accept('./print.js', () => {
//         printMe();
//     });
// }