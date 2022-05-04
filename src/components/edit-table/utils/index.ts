// 生成表格列名列表
export const createColumnCodes = (len:number = 52) => {
  if (len < 1) { return [] }
  let codes:string[] = [];
  for (let i = 0; i < len; i++) {
    let firstCodeIndex = Math.floor(i / 26);
    // 大于 26 列时
    let firstCode = firstCodeIndex > 0 ? String.fromCharCode(64 + firstCodeIndex) : '';
    let x = i === 0 ? 0 : i % 26;
    codes.push(firstCode + String.fromCharCode(65 + x));
  }
  return codes;
}

// 生成表格列名对象列表
// codes: 要生成的列名数组, width: 列宽
export const createColumnCodesObject = (codes:string[], width:number = 80) => {
  return codes.map((code, index) => {
    return {
      index,
      width,
      code,
      offsetLeft: index * width,
    }
  })
}

// 生成行号对象列表
// len: 要生成的行数, height: 行高
export const createRowNamesObject = (len:number, height:number = 34) => {
  interface RowItem {
    index: number,
    height: number,
    name: number,
    offsetTop: number,
  }
  let result:RowItem[] = []
  for (let i = 0; i < len; i++) {
    result.push({
      index: i,
      height,
      name: i + 1,
      offsetTop: i * height,
    })
  }
  return result
}