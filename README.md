# 8D - React FlatList

A FlatList ReactJS Component For Large Lists

```sh
npm i @octaldev/react-flatlist
```

### Conteúdo

- [Utilização Padrão](#utilização-padrão)
- [APIs Suportadas](#apis-suportadas)

## Utilização Padrão

A primeira coisa a ser feita é instanciar o provider, assim:

```js
import React from "react";
import FlatList from "@octaldev/react-flatlist";

const App = () => (
    <FlatList
		data={[ 1, 2, 3, 4, 5 ]}
		renderItem={({ item }) => (
			<p>{ item }</p>
		)}
	/>
)

export default App;
```

## APIs suportadas

| name                      | type                           |    default       | description |
| ------------------------- | ------------------------------ | ---------------- | |
| data                      | ```array```                    | ```[]```         | |
| renderItem                | ```function```                 | ```() => null``` | |
| onTopReached              | ```function```                 | ```() => null``` | when flatlist is scrolled to the top |
| onEndReached              | ```function```                 | ```() => null``` | when flatlist is scrolled to the bottom |
| initialNumToRender        | ```number```                   | ```30```         | |
| ListEmptyComponent        | ```component/node/function```  | ```null```       | render when data is an empty array |
| ListHeaderComponent       | ```component/node/function```  | ```null```       | |
| ListHeaderComponentStyle  | ```style object```             | ```null```       | |
| ListFooterComponent       | ```component/node/function```  | ```null```       | |
| ListFooterComponentStyle  | ```style object```             | ```null```       | |
| Component                 | ```component / function```     | ```div```        | this is a custom component for the flatlist container |
