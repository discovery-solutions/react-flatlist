# 8D - React FlatList

A Super Light ReactJS Modal

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

| name          | type          | default  |
| ------------- | ------------- | ----- |
| data          | ```array```         | ```[]``` |
| renderItem    | ```function```      | ```() => null``` |
| onEndReached  | ```function```      | ```() => null``` |
| initialNumToRender  | ```number```  | ```30``` |
| ListHeaderComponent  | ```component / node / function```  | ```null``` |
| ListHeaderComponentStyle  | ```style object```  | ```null``` |
| ListFooterComponent  | ```component / node / function```  | ```null``` |
| ListFooterComponentStyle  | ```style object```  | ```null``` |
