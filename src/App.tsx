import React, { useState, FormEvent, useEffect } from 'react'
import './App.css'
import { ProductionTask } from './types/types'

// 从本地存储获取任务
const getStoredTasks = (): ProductionTask[] => {
  const storedTasks = localStorage.getItem('productionTasks')
  return storedTasks ? JSON.parse(storedTasks) : []
}

// 从本地存储获取商品名称历史记录
const getStoredProducts = (): string[] => {
  const storedProducts = localStorage.getItem('productHistory')
  return storedProducts ? JSON.parse(storedProducts) : []
}

// 从本地存储获取规格历史记录
const getStoredSpecifications = (): string[] => {
  const storedSpecs = localStorage.getItem('specificationHistory')
  return storedSpecs ? JSON.parse(storedSpecs) : []
}

// 从本地存储获取奖类历史记录
const getStoredBonus = (): string[] => {
  const storedBonus = localStorage.getItem('bonusHistory')
  return storedBonus ? JSON.parse(storedBonus) : []
}

// 从本地存储获取备注历史记录
const getStoredRemarks = (): string[] => {
  const storedRemarks = localStorage.getItem('remarksHistory')
  return storedRemarks ? JSON.parse(storedRemarks) : []
}

function App() {
  const [tasks, setTasks] = useState<ProductionTask[]>(getStoredTasks())
  const [productHistory, setProductHistory] = useState<string[]>(getStoredProducts())
  const [specificationHistory, setSpecificationHistory] = useState<string[]>(getStoredSpecifications())
  const [bonusHistory, setBonusHistory] = useState<string[]>(getStoredBonus())
  const [remarksHistory, setRemarksHistory] = useState<string[]>(getStoredRemarks())
  const [formData, setFormData] = useState({
    product: '',
    specification: '',
    quantity: '',
    bonus: '',
    remarks: '',
    date: ''
  })

  // 当任务列表更新时，保存到本地存储
  useEffect(() => {
    localStorage.setItem('productionTasks', JSON.stringify(tasks))
  }, [tasks])

  // 当商品历史记录更新时，保存到本地存储
  useEffect(() => {
    localStorage.setItem('productHistory', JSON.stringify(productHistory))
  }, [productHistory])

  // 当规格历史记录更新时，保存到本地存储
  useEffect(() => {
    localStorage.setItem('specificationHistory', JSON.stringify(specificationHistory))
  }, [specificationHistory])

  // 当奖类历史记录更新时，保存到本地存储
  useEffect(() => {
    localStorage.setItem('bonusHistory', JSON.stringify(bonusHistory))
  }, [bonusHistory])

  // 当备注历史记录更新时，保存到本地存储
  useEffect(() => {
    localStorage.setItem('remarksHistory', JSON.stringify(remarksHistory))
  }, [remarksHistory])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const newTask: ProductionTask = {
      id: Date.now().toString(),
      product: formData.product,
      specification: formData.specification,
      quantity: Number(formData.quantity),
      bonus: formData.bonus,
      remarks: formData.remarks,
      date: formData.date,
      createdAt: new Date().toISOString()
    }

    // 添加新任务
    setTasks(prev => [...prev, newTask])
    
    // 更新商品历史记录（如果是新商品）
    if (formData.product && !productHistory.includes(formData.product)) {
      setProductHistory(prev => [...prev, formData.product])
    }

    // 更新规格历史记录（如果是新规格）
    if (formData.specification && !specificationHistory.includes(formData.specification)) {
      setSpecificationHistory(prev => [...prev, formData.specification])
    }

    // 更新奖类历史记录（如果是新奖类）
    if (formData.bonus && !bonusHistory.includes(formData.bonus)) {
      setBonusHistory(prev => [...prev, formData.bonus])
    }

    // 更新备注历史记录（如果是新备注）
    if (formData.remarks && !remarksHistory.includes(formData.remarks)) {
      setRemarksHistory(prev => [...prev, formData.remarks])
    }
    
    // 重置表单
    setFormData({
      product: '',
      specification: '',
      quantity: '',
      bonus: '',
      remarks: '',
      date: ''
    })
  }

  // 删除单个任务
  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('确定要删除这条任务吗？')) {
      setTasks(prev => prev.filter(task => task.id !== taskId))
    }
  }

  // 初始化所有数据
  const handleInitialize = () => {
    if (window.confirm('确定要清空任务列表吗？\n注意：商品名称、规格、奖类和备注的历史记录将会保留。')) {
      // 只清除任务列表
      setTasks([])
      localStorage.removeItem('productionTasks')
    }
  }

  // 处理打印功能
  const handlePrint = () => {
    window.print();
  }

  return (
    <div className="app">
      <header className="header">
        <h1>生产任务发布单</h1>
      </header>
      
      <main className="main">
        <div className="task-editor">
          <h2>添加新任务</h2>
          <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>商品名称：</label>
              <div className="input-with-select">
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  className="history-select"
                >
                  <option value="">选择或输入新商品</option>
                  {productHistory.map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  placeholder="输入新商品名称"
                  className="new-input"
                  list="product-suggestions"
                />
                <datalist id="product-suggestions">
                  {productHistory.map((product, index) => (
                    <option key={index} value={product} />
                  ))}
                </datalist>
              </div>
            </div>
            
            <div className="form-group">
              <label>规格：</label>
              <div className="input-with-select">
                <select
                  name="specification"
                  value={formData.specification}
                  onChange={handleInputChange}
                  className="history-select"
                >
                  <option value="">选择或输入新规格</option>
                  {specificationHistory.map((spec, index) => (
                    <option key={index} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="specification"
                  value={formData.specification}
                  onChange={handleInputChange}
                  placeholder="输入新规格"
                  className="new-input"
                  list="specification-suggestions"
                />
                <datalist id="specification-suggestions">
                  {specificationHistory.map((spec, index) => (
                    <option key={index} value={spec} />
                  ))}
                </datalist>
              </div>
            </div>
            
            <div className="form-group">
              <label>件数：</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="请输入件数"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>奖类：</label>
              <div className="input-with-select">
                <select
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleInputChange}
                  className="history-select"
                >
                  <option value="">选择或输入新奖类</option>
                  {bonusHistory.map((bonus, index) => (
                    <option key={index} value={bonus}>
                      {bonus}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleInputChange}
                  placeholder="输入新奖类"
                  className="new-input"
                  list="bonus-suggestions"
                />
                <datalist id="bonus-suggestions">
                  {bonusHistory.map((bonus, index) => (
                    <option key={index} value={bonus} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="form-group">
              <label>生产日期：</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>备注：</label>
              <div className="input-with-select">
                <select
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  className="history-select"
                >
                  <option value="">选择或输入新备注</option>
                  {remarksHistory.map((remark, index) => (
                    <option key={index} value={remark}>
                      {remark}
                    </option>
                  ))}
                </select>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  placeholder="输入新备注"
                  className="new-input remarks-input"
                />
              </div>
            </div>
            
            <button type="submit" className="submit-btn">添加任务</button>
          </form>
        </div>
        
        <div className="task-list">
          <div className="task-list-header">
            <h2>任务列表</h2>
            <div className="task-list-buttons">
              <button onClick={handlePrint} className="print-btn">打印任务列表</button>
              <button onClick={handleInitialize} className="initialize-btn">清空任务列表</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>商品名称</th>
                <th>规格</th>
                <th>件数</th>
                <th>奖类</th>
                <th>生产日期</th>
                <th>备注</th>
                <th className="action-column">操作</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.product}</td>
                  <td>{task.specification}</td>
                  <td>{task.quantity}</td>
                  <td>{task.bonus}</td>
                  <td>{task.date}</td>
                  <td>{task.remarks}</td>
                  <td className="action-column">
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="delete-btn"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default App 