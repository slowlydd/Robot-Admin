/*
 * @Author: 杨晨誉
 * @Date: 2022-03-24 14:32:19
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-12-02 11:43:34
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\table\data.tsx
 * @Description: tsx数据层
 *
 */

import type { I_RenderParams, I_TableColumns } from '@/components/C_Table/types'
import type { I_FormItem } from '_c/C_FormSearch/types'
import './index.scss'

import { deleteDataRow, getDetail } from '@/api/demo'
import { HTML_LINE_EDIT } from '_c/C_Table/useEffect'

export const FORM_ITEM_LIST: I_FormItem[] = [
  {
    type: 'input',
    prop: 'name',
    placeholder: '请输入检索信息',
    isFocus: false,
    hisList: ['11111111', '2222222', '33333333'],
  },
  {
    type: 'select',
    prop: 'type',
    placeholder: '请选择车辆类型',
    list: [
      {
        labelDefault: 'one',
        value: 1,
      },
      {
        labelDefault: 'two',
        value: 2,
      },
      {
        labelDefault: 'three',
        value: 3,
      },
    ],
  },

  {
    type: 'date-range',
    prop: 'range',
  },

  {
    type: 'input',
    prop: 'test',
    placeholder: '请输入检索信息',
  },

  {
    type: 'input',
    prop: 'test',
    placeholder: '请输入检索信息',
    show: false,
  },
  {
    type: 'input',
    prop: 'test123',
    placeholder: '请输入检索信息',
    show: false,
  },
  {
    type: 'input',
    prop: 'test456',
    placeholder: '请输入检索信息',
    show: false,
  },
]

// TODO: 检索参数

export const FORM_PARAMS = {
  name: undefined,
  type: undefined,
  range: undefined,
}

// 需要用响应式数据接收一下传递过来的参数，不然初始化界面的时候，因为参数丢失了响应式，只会用初始数据处理逻辑导致 Error
const tableData = ref()
const tableRef = ref()

// TODO: 要渲染的列表项
export const COLUMNS = (data: any, tRef): I_TableColumns[] => {
  tableData.value = data
  tableRef.value = tRef
  return [
    {
      type: 'index',
      label: '序号',
      width: 60,
    },
    {
      type: 'selection',
      label: '',
      width: 60,
    },
    {
      type: 'expand',
      label: 'Expand',
      width: 76,
      render: ({ row }) => {
        // 如果后台反悔对应列表展开行的数据，根据它的层级，渲染设计DOM即可，然后把这一坨代码放出去
        return (
          <div>
            {/* 我特么的，是辣个撒，列表展开行拿到滴数据撒, {JSON.stringify(row)}
             */}
            <div>
              <p>Date: {row.date}</p>
              <p>Name: {row.name}</p>
              <p>Address: {row.address}</p>

              <h3>Family 我在下面模拟跟上面进行选中效果联动</h3>
              <el-table
                ref='childTableRef'
                data={row.child}
                onSelect={(selection, currRow, e) =>
                  handleSelectChild(selection, currRow, e, row.child)
                }
                onSelectionChange={handleSelectionChange}>
                {/* is-indeterminate */}
                {childColumns.map((item) => {
                  return (
                    <el-table-column
                      type={item.type}
                      prop={item.prop}
                      clasName={'is-indeterminate'}
                    />
                  )
                })}
              </el-table>
            </div>
          </div>
        )
      },
    },
    {
      //表头
      label: '日期',
      slotHeader: () => {
        return (
          <el-tooltip
            effect='dark'
            content='jsx渲染的自定义表头'
            placement='top-start'>
            <el-button>
              <el-icon-timer />
            </el-button>
          </el-tooltip>
        )
      },
      print: 'date',
      // 对齐方式
      // TODO: 这里需要注意，响应式数据，必须传递对应的row，不能是具体的值
      render: (params: I_RenderParams) =>
        HTML_LINE_EDIT(params, 'date', tableData.value),
    },
    {
      label: '姓名',
      print: 'name',
      render: ({ row }: any) => (
        <div>
          <el-popover
            v-slots={{ reference: () => <el-tag>{row.name}</el-tag> }}
            effect='light'
            trigger='hover'
            placement='top'
            width='auto'>
            <div>name: {row.name}</div>
            <div>address: {row.address}</div>
          </el-popover>
        </div>
      ),
    },
    {
      label: '地址',
      print: 'address',
      render: (params: I_RenderParams) =>
        HTML_LINE_EDIT(params, 'address', tableData.value),
    },
    {
      width: 160,
      label: '详细描述',
      prop: 'desc',
    },
    {
      label: '操作',
      actionBtns: {
        lineEdit: 'patchLineFn',
        delete: deleteDataRow,
        detail: getDetail,
      },
      render: ({ row, index }: any) => (
        <div>
          <div>
            <el-button size='small'>
              <el-icon-more />
            </el-button>
          </div>
        </div>
      ),
    },
  ]
}

import { v_required } from '_utils/v_verify'

// 新增弹窗数据源
export const OPTIONS: any[] = [
  {
    type: 'input',
    value: '',
    label: '时间',
    prop: 'time',
    placeholder: '请输入时间',
    rules: v_required('时间不能为空'),
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '姓名',
    prop: 'name',
    placeholder: '请输入姓名',
    rules: v_required('姓名不能为空'),
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '地址',
    prop: 'address',
    placeholder: '请输入地址',
    rules: v_required('地址不能为空'),
    attrs: {
      clearable: true,
    },
  },
]

// 协助张东处理 expand 中的渲染项
export const childColumns = [
  {
    type: 'index',
  },
  {
    type: 'selection',
    label: '',
    width: 60,
  },

  {
    label: '日期',
    prop: 'date',
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '地址',
    prop: 'address',
  },
]

// FIXME: 下面的逻辑暂未完善
const selectAllChildMap = new Map()

const childTableRef = ref()

const handleSelect = (selection, row, e, rowChild) => {
  const isCheck = selection.includes(row)
  tableData.value.forEach((item, index) => {
    if (item.id === row.id) {
      tableRef.value.toggleRowExpansion(item, true)
      const tempList = rowChild
      nextTick(() => {
        if (tempList.length !== 0) {
          tempList.forEach((childItem) => {
            selectAllChildMap.set(index, item)
            childTableRef.value[index].toggleRowExpansion(childItem, isCheck)
          })
        }
      })
    }
    if (isCheck) validIs(row.subList, rowChild)
    else cleanIs(null, row)
  })
}

// FIXME: 需要模拟的数据有子父级id进行对应，然后完善这一块的逻辑
const handleSelectChild = (selection, row) => {
  const isCheck = selection.length > 0
  tableData.value.forEach((item, index) => {
    selectAllChildMap.set(index, item)
    if (item.id === row.parentId) {
      nextTick(() => {
        tableRef.value.SourcetableRef.toggleRowSelection(item, isCheck)
      })
    }
  })
}

const handleSelectionChange = (val) => {
  // console.log('val ===>', val)
}
