### For New User Guide
> You can install User-guide in a few simple steps. 
#### How To Use?
```js
import userGuide from './src/index.js'
```

```js 
userGuide([
  {
    element: '#user-guide-id1',
    position: 'left',
    content: `This is a introduction.`
  },
  {
    element: '#user-guide-id2',
    position: 'right',
    content: `This is a introduction.`
  },
  {
    element: '#user-guide-id3',
    position: 'top',
    content: `This is a introduction.`
  },
  {
    element: '#user-guide-id4',
    position: 'bottom',
    contextHeight: 120, // you can set the context area height.
    content: `This is a introduction.`
  }
])
```
OR
```js 
userGuide({
    element: '#user-guide-id1',
    position: 'left',
    content: `This is a introduction.`
})
```
