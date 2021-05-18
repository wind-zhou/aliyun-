import React , {useState , useEffect} from 'react'
import mock from './mock/mock.json'
import  './App.css'
var i

export default function App() {
  const [data,setData] = useState([])


  //滚动
  function scroll(){
    let tbody = document.getElementsByClassName('tbody')[0]
    let table = document.getElementsByClassName('tableData')[0]
    table.scrollTop+=24
    if(table.scrollTop>=24){
      tbody.appendChild(tbody.children[0])
      table.scrollTop=0
    }
  }
  //轮播事件循环
  function start(){
    let speed=1000
    setData(mock.data)
    i=window.setInterval(()=>{
      scroll()
    },speed)
  }
  //进行轮播
  useEffect(()=>{
    //调用轮播事件
    start()
    return ()=>{
      clearInterval(i)
    }
  })
  return (
    <div>
      <div className='basicTable'>
        {/* 用来解释标题 */}
        <div className='title'>
          <span>最新职位</span>
          <span>更多</span>
        </div>
        {/* 用来展示内容 */}
        <table className= 'tableData'>
          <tbody
            className='tbody'
            onMouseLeave={()=>{
              //为了防止一开始鼠标在此区域，
              window.clearInterval(i)
              start()
            }}
            onMouseEnter={()=>{
              window.clearInterval(i)
            }}
          >
            {data.map((value)=>{
              return <tr
              className='items'
              key={value.id}
              >
                  <td
                  className="itemsName"
                  >{value.name}</td>
                  <td
                  className="itemsCity"
                  >{value.city}</td>
                  <td
                  className='itemsTime'
                  >{value.time}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

