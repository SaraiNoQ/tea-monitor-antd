<template>
  <div class="content">
    <a-config-provider :locale="zhCN">
      <div class="export-button">
        <a-button type="primary" :loading="exportallLoading" @click="exportAllItem">
          <template #icon>
            <DownloadOutlined />
          </template>
          导出全部
        </a-button>
        <a-button :loading="exportLoading" @click="showModal">
          <template #icon>
            <SelectOutlined />
          </template>
          导出指定内容
        </a-button>
      </div>

      <a-modal
        v-model:visible="visible"
        title="日期范围"
        ok-text="导出"
        cancel-text="取消"
        @ok="exportItem"
      >
        <div class="date-modal">
          <a-range-picker v-model:value="dateValue" show-time> </a-range-picker>
        </div>
      </a-modal>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="pageSetting"
        :loading="loading"
        align="center"
        @change="handleTableChange"
        @expand="handleExpand"
      >
        <template #expandedRowRender>
          <a-table
            :columns="innerColumns"
            :data-source="innerData"
            :pagination="false"
            align="center"
          >
          </a-table>
        </template>
      </a-table>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { DownloadOutlined, SelectOutlined } from "@ant-design/icons-vue";
// import { Moment } from "moment";
// @ts-ignore
import axios from "~/utils/axios";

interface RecordItem {
  id: string;
  userId: string;
  age: number;
  teaAge: number;
  favoriteTea: string;
  growthIn: string;
  lifeIn: string;
  height: number;
  weight: number;
  sex: number;
  createTime: Date;
  modifyTime: Date;
  professional: string;
  results: Array<Record<string, string | number>>;
  user: UserInfo | null;
}

interface UserInfo {
  avatar: string;
  id: string;
  createTime: Date;
  modifyTime: Date;
  nickname: string;
  isAdmin: number;
  openId: string;
}

const columns = [
  { title: "序号", dataIndex: "key", key: "key" },
  { title: "昵称", dataIndex: "nickname", key: "nickname" },
  { title: "年龄（年）", dataIndex: "age", key: "age" },
  { title: "茶龄（年）", dataIndex: "tea", key: "tea" },
  { title: "BMI指数", dataIndex: "bmi", key: "bmi" },
  { title: "性别", dataIndex: "sex", key: "sex" },
  { title: "职业", dataIndex: "profesional", key: "profesional" },
  { title: "出生地", dataIndex: "growthIn", key: "growthIn" },
  { title: "现居地", dataIndex: "lifeIn", key: "lifeIn" },
  // { title: "身高", dataIndex: "height", key: "height" },
  // { title: "体重", dataIndex: "weight", key: "weight" },
  // { title: "创建时间", dataIndex: "createTime", key: "createTime" },
  { title: "最后修改时间", dataIndex: "modifyTime", key: "modifyTime" },
];

interface DataItem {
  key: number;
  nickname: string | undefined;
  age: number;
  tea: number;
  bmi: number | string;
  sex: number | string;
  profesional: string;
  growthIn: string;
  lifeIn: string;
  modifyTime: Date;
  records: Array<Record<string, string | number>>;
}

const tableData = ref<DataItem[]>([]);

const innerColumns = [
  { title: "体质类型", dataIndex: "BodyTypeId", key: "date" },
  {
    title: "测试结果",
    key: "state",
    dataIndex: "state",
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => a.state.localeCompare(b.state, "zh"),
  },
];

interface innerDataItem {
  key: number;
  BodyTypeId: string;
  state: number | string;
}

const innerData = ref<innerDataItem[]>([]);

const handleExpand = (expanded: boolean, record: any) => {
  console.log(expanded, record);
  if (expanded) {
    const arr: innerDataItem[] = [];
    record.records.forEach((e: any, index: number) => {
      arr.push({
        key: index,
        BodyTypeId: e.bodyTypeName,
        state: e.result === 2 ? "📌 确认" : e.result === 1 ? "⭕ 倾向" : "❌ 无关",
      });
    });
    innerData.value = arr;
  }
};

interface PageSetting {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger: boolean;
  pageSizeOptions: string[];
}

const pageSetting: PageSetting = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ["10", "50", "100", "200"],
});

const loading = ref<boolean>(false);

const refreshTable = async () => {
  loading.value = true;
  const { current, pageSize } = pageSetting;
  try {
    const res = await axios.get(`/api/background/list?pageNo=${current}&pageSize=${pageSize}`);
    const { data } = res;
    const arr: Array<DataItem> = [];
    data.records.forEach((record: RecordItem, index: number) => {
      arr.push({
        key: (pageSetting.current - 1) * pageSetting.pageSize + (index + 1),
        nickname: record.user?.nickname,
        age: record.age,
        tea: record.teaAge,
        bmi: (record.weight / (record.height / 100) ** 2).toFixed(2),
        sex: record.sex === 0 ? "男" : "女",
        profesional: record.professional,
        growthIn: record.growthIn,
        lifeIn: record.lifeIn,
        modifyTime: record.modifyTime,
        records: record.results,
      });
    });
    tableData.value = arr;
  } catch (error) {
    console.log("refreshTable error:", error);
  } finally {
    loading.value = false;
  }
};

const handleTableChange = (pagination: PageSetting) => {
  pageSetting.current = pagination.current;
  pageSetting.pageSize = pagination.pageSize;
  refreshTable();
};

onBeforeMount(async () => {
  try {
    loading.value = true;
    const res = await axios.get("/api/background/list");
    if (res && res.code === 200) {
      const records = res.data.records;
      const arr: Array<DataItem> = [];
      records.forEach((record: RecordItem, index: number) => {
        arr.push({
          key: (pageSetting.current - 1) * pageSetting.pageSize + (index + 1),
          nickname: record.user?.nickname,
          age: record.age,
          tea: record.teaAge,
          bmi: (record.weight / (record.height / 100) ** 2).toFixed(2),
          sex: record.sex === 0 ? "男" : "女",
          profesional: record.professional,
          growthIn: record.growthIn,
          lifeIn: record.lifeIn,
          modifyTime: record.modifyTime,
          records: record.results,
        });
      });
      tableData.value = arr;
      pageSetting.total = res.data.total;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

const exportallLoading = ref<boolean>(false);
const exportLoading = ref<boolean>(false);
const exportAllItem = () => {
  exportallLoading.value = false;
};

const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;
};
const dateValue = ref<any[]>([]);
const exportItem = () => {
  console.log(dateValue.value);
  // visible.value = false;
};
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 12px 24px 24px 24px;
  min-height: 74vh;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);

  .export-button {
    display: flex;
    padding-bottom: 12px;
    gap: 20px;
  }
}

.date-modal {
  margin: 0 auto;
  :deep(.ant-picker-input) {
    width: 200px;
  }
}
</style>
