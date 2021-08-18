//输入数字
onkeyup="value=value.replace(/[^\d]/g,'’)"

//限制  type设置nunber
oninput = "value=((value.replace(/[^0-9.]/g,'')).replace(/([0-9]+\.[0-9]{2})[0-9]*/,'$1'))"

// element 输入限制 整数 小数
// https://blog.csdn.net/xiongdaandxiaomi/article/details/106420440
