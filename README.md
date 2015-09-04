
#Klondike

I have created a working game of klondike solitaire for a laugh. Compilation is _easy_ - winning is the hard part.

##Get the typescript compiler nightly build

At time of writing, in order to compile React/Typescript .tsx you will need the latest version of Typescript:<br/>
`$ npm install -g typescript@next`

##Webpack
Bundling tool webpack can be installed through npm:

`$ npm install webpack -g`

##Compile Typescript and Run webpack

`$ npm install`<br/>
`$ tsc`<br/>
`$ webpack`

##Optional - watch tasks
If you plan on doing any development of your own, I recommend running <br/>
`$ webpack --watch`

And if your editor doesn't support tsx compilation, you will also need to have typescript watch task running simultaneously: <br/>
`$ tsc --watch`
