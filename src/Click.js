import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-native";

export default function Click(props) {
  const [count, setCount] = useState(props.count);
  let countString = "count:" + count;

  function showCount() {
    Alert.alert("count:" + count);
    // props.update(count);
  }

  useEffect(showCount);

  return <Button title={countString} onPress={() => setCount(count + 1)} />;

  // // (2)
  // const [count, setCount] = useState(props.count);
  // let countString = "count:" + count;

  // function showCount() {
  //   Alert.alert("count:" + count);
  // }

  // useEffect(showCount); // 元件被 render 之後執行

  // return <Button title={countString} onPress={() => setCount(count + 1)} />;

  // // (1)
  // // let count = 0;
  // const [count, setCount] = useState(0);
  // let countString = "count: " + count; //React 的 UI 不會跟著變動，如果要變動可用 State 監控變數

  // // setCount: 按鈕會實時更新，但 Alert 的值會少1
  // // function handleClick() {
  // //   setCount(count + 1); //不可使用 count++ ， 因為state不是實時更新會無效
  // //   Alert.alert("count: " + count);
  // // }
  // // return <Button title={countString} onPress={handleClick} />;

  // //useEffect
  // function showCount() {
  //   Alert.alert("count: " + count);
  // }
  // useEffect(showCount); //如果監控的東西過多，會影響速度
  // return <Button title={countString} onPress={() => setCount(count + 1)} />; //setCount 變動就更新
}
