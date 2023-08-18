<template>
  <div class="epsplanet-panel-base layerlist" style="width: 296px">
    <el-tree ref="treeRef" :data="treeData" show-checkbox node-key="id" :props="defaultProps"
      :default-checked-keys="defaultChecked" :default-expanded-keys="defaultExpanded" @check-change="handleCheck"
      @node-expand="handleExpand" @node-collapse="handleCollapse">
      <template #default="{ node, data }">
        {{ node.label }}
        <span class="nodeBtn">
          <a class="iconfont icon-shu-4" @click="locate(data, node)" v-if="node.isLeaf" title="定位"></a>
        </span>
      </template>
    </el-tree>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import {
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  onBeforeUnmount,
  defineComponent,
  ref,
  inject
} from "vue";
// import { Service } from "~/utils/service";
import type { ElTree } from "element-plus";
import _ from "lodash";
// import { stringify } from "querystring";
export default defineComponent({
  name: "EpsplanetLayerList",
  props: [],
  setup() {
    const { proxy } = getCurrentInstance() as any;

    let sunwayearth: any;
    const thisVue = proxy;
    const datas = reactive({
      treeData: [] as any,
      defaultProps: {
        children: "children",
        label: "label",
      },
      defaultChecked: [] as any,
      defaultExpanded: [] as any,
      expandKeys: [] as any,
      disposer: [] as any,
    });
    onMounted(async () => {
      // sunwayearth = await Service.instance.getEarth();
      sunwayearth = inject('earth')
      init();
    });
    onBeforeUnmount(() => {
      del();
    });
    function getChildList(node) {
      let childList: any = [];
      node.forEach((n) => {
        if (n.children) {
          let child = getChildList(n.children);
          childList.push({
            label: n.title,
            children: child,
            id: n.xbsjID,
          });
          if (n.expand) {
            datas.expandKeys.push(n.xbsjID);
          }
        } else {
          childList.push({
            label: n.title,
            guid: n.czmObject.xbsjGuid,
            isLeaf: true,
            id: n.xbsjID,
          });
          if (n.czmObject.show) {
            datas.defaultChecked.push(n.xbsjID);
          }
        }
      });
      return childList;
    }
    function init() {
      datas.treeData = getChildList(sunwayearth.sceneTree.root.children);
      datas.disposer.push(
        XE.MVVM.watch(
          () => {
            if (sunwayearth.sceneTree) {
              return sunwayearth.sceneTree.root.toJSONStr();
            }
          },
          () => {
            // refresh();
            _.debounce(() => {
              refresh();
            }, 100)();
          }
        )
      );
    }
    function refresh() {
      if (sunwayearth.sceneTree) {
        datas.defaultChecked = [];
        datas.expandKeys = [];
        datas.treeData = getChildList(sunwayearth.sceneTree.root.children);
        // setTimeout(() => {
        // proxy.$refs.treeRef.setCheckedKeys(datas.defaultChecked);
        proxy.$refs.treeRef.store.setDefaultCheckedKey(datas.defaultChecked);
        proxy.$refs.treeRef.store.setDefaultExpandedKeys(datas.expandKeys);
        // }, 10);
      }
    }
    window["refresh"] = refresh;
    function handleCheck(data, checked, childChecked) {
      if (data.children && !childChecked) {
        getByID(data.id).then((f: any) => {
          // f.enabled = checked;
          f.setAllChildrenEnabled(checked);
          console.log(f);
        });
      }
      if (data.guid) {
        let czmObject = sunwayearth.getObject(data.guid);
        // console.log(czmObject);
        czmObject.show = checked;
      }
    }
    //展开节点
    function handleExpand(data) {
      getByID(data.id).then((f: any) => {
        f.expand = true;
      });
    }
    //收起节点
    function handleCollapse(data) {
      getByID(data.id).then((f: any) => {
        f.expand = false;
      });
    }
    function getByID(id) {
      return new Promise((resolve) => {
        let arr = sunwayearth.sceneTree.root.children;
        findObj(arr);
        function findObj(arr) {
          arr.forEach((e) => {
            if (e.xbsjID == id) {
              // console.log("get it", e);
              resolve(e);
            }
            // if (e.czmObject?.xbsjID == id) {
            //   console.log("get it", e.czmObject);
            // }
            if (e.children) {
              findObj(e.children);
            }
          });
        }
      });
    }
    window["getByID"] = getByID;
    function locate(data, node) {
      sunwayearth.getObject(data.guid).flyTo();
    }
    function del() {
      datas.disposer.forEach((d) => d());
    }
    const refData = toRefs(datas);
    return {
      ...refData,
      init,
      handleCheck,
      handleExpand,
      handleCollapse,
      locate,
      del,
    };
  },
});
</script>
<style scoped></style>
