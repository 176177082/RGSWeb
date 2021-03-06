import { asyncRouterMap } from '../index'
import Layout from '../../views/layout/Layout'
import { getProjectRegional } from '@/api/adminMgmt'

export function getRegionalMenu() {
  return new Promise((resolve, reject) => {
    getProjectRegional().then(response => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].status === '处理完成') {
          asyncRouterMap.push({
            path: '/project' + response.data[i].id,
            component: Layout,
            redirect: '/project',
            alwaysShow: true,
            meta: {
              title: response.data[i].name,
              icon: 'nested',
              roles: ['user']
            },
            // hidden: true,
            children: [
              {
                path: 'taskpackageList',
                name: 'TaskpackageList' + response.data[i].id,
                component: () => import('@/views/TaskpackageList/index'),
                props: (route) => ({ regionalName: response.data[i].name }),
                key: response.data[i].id,
                meta: { title: '任务包列表', icon: 'table', roles: ['user'] }
              },
              {
                path: 'taskpackagepartition',
                name: 'Taskpackagepartition' + response.data[i].id,
                component: () => import('@/views/TaskpackagePartition/index'),
                props: (route) => ({ regionalName: response.data[i].name }),
                meta: { title: '任务包划分', icon: 'example', roles: ['admin'] }
              },
              {
                path: 'taskPackageStatistics',
                name: 'TaskPackageStatistics' + response.data[i].id,
                component: () => import('@/views/TaskPackageStatistics/index'),
                props: (route) => ({ regionalName: response.data[i].name }),
                meta: { title: '任务包统计', icon: 'chart', roles: ['user'] }
              },
              {
                path: '/adminMgmt' + response.data[i].id,
                component: () => import('@/views/AdminMgmt/ScheduleMgmt/index'),
                props: (route) => ({ regionalName: response.data[i].name }),
                redirect: '/adminMgmt' + response.data[i].id,
                alwaysShow: true,
                meta: {
                  title: '管理',
                  icon: 'lock',
                  roles: ['admin']
                },
                // hidden: true,
                children: [
                  {
                    path: '/adminMgmt/scheduleMgmt' + response.data[i].id,
                    component: () => import('@/views/AdminMgmt/ScheduleMgmt/index'),
                    props: (route) => ({ regionalName: response.data[i].name }),
                    name: 'ScheduleMgmt' + response.data[i].id,
                    meta: {
                      title: '进度管理',
                      roles: ['admin']
                    }
                  }
                ]
              }
            ]
          })
        }
      }

      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}
