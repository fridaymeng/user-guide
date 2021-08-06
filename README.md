### For New User Guide
#### How To Use?
> import userGuide from './src/index.js'

```js 
this.userGuide([
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
    contextHeight: 120, // if the postion is 'bottom', you must set this contextHeight.
    content: `This is a introduction.`
  }
])
```
