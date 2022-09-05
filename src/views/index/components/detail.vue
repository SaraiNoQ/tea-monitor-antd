<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="tableData"
      align="center"
      :loading="loading"
      :pagination="false"
    >
    </a-table>

    <div class="output">
      <div v-for="(item, index) in questionsData" :key="index" class="q">
        <div class="head">{{ index + 1 }}. {{ item.description }}</div>
        <a-radio-group v-model:value="item.options" :name="item.description" size="large">
          <a-radio value="1">没有（根本不/从来没有）</a-radio>
          <a-radio value="2">很少（有一点/偶尔）</a-radio>
          <a-radio value="3">有时（有些/少数时间）</a-radio>
          <a-radio value="4">经常（相当多数时间）</a-radio>
          <a-radio value="5">总是（非常每天）</a-radio>
        </a-radio-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import axios from "axios";

interface DataItem {
  // nickname: string | undefined;
  age: number;
  tea: number;
  bmi: number | string;
  sex: number | string;
  profesional: string;
  growthIn: string;
  lifeIn: string;
  modifyTime: Date;
  // records: Array<Record<string, string | number>>;
}

interface DataInfo {
  age: number;
  favoriteTea: string;
  growthIn: string;
  height: number;
  lifeIn: string;
  professional: string;
  sex: number | string;
  teaAge: number;
  weight: number;
}

interface ArrItem {
  description: string;
  options: string;
  sequence: number;
  time: Date;
}

const getQueryString = (name: string) => {
  const r = window.location.href; //获取url中"?"符后的字符串并正则匹配
  const index = r.search(name);
  return index === -1 ? "" : r.substring(index + name.length + 1);
};

onBeforeMount(async () => {
  loading.value = true;
  try {
    const res = await axios.post(`/api/history/detail`, {
      id: getQueryString("id"),
    });
    if (res.status === 200) {
      const resData: DataInfo = res.data.info;
      const resArr: ArrItem[] = res.data.problem;
      console.log(res.data);
      const arr: DataItem[] = [
        {
          age: resData.age,
          tea: resData.teaAge,
          bmi: (resData.weight / (resData.height / 100) ** 2)?.toFixed(2),
          sex: resData.sex === 0 ? "男" : "女",
          profesional: resData.professional,
          growthIn: resData.growthIn,
          lifeIn: resData.lifeIn,
          modifyTime: resArr[0]?.time,
        },
      ];
      tableData.value = arr;
      questionsData.value = resArr;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

const loading = ref<boolean>(false);
const columns = [
  { title: "年龄（年）", dataIndex: "age", key: "age" },
  { title: "茶龄（年）", dataIndex: "tea", key: "tea" },
  { title: "BMI指数", dataIndex: "bmi", key: "bmi" },
  { title: "性别", dataIndex: "sex", key: "sex" },
  { title: "职业", dataIndex: "profesional", key: "profesional" },
  { title: "出生地", dataIndex: "growthIn", key: "growthIn" },
  { title: "现居地", dataIndex: "lifeIn", key: "lifeIn" },
  { title: "最后修改时间", dataIndex: "modifyTime", key: "modifyTime" },
];

const tableData = ref<DataItem[]>([]);
const questionsData = ref<ArrItem[]>([]);
</script>

<style scoped lang="less">
.output {
  width: 100%;
  margin-top: 20px;
  .q {
    margin: 5px auto;
    width: fit-content;

    .head {
      font-size: 18px;
      line-height: 36px;
    }
  }
}

@media screen and (min-width: 1024px) {
  /deep/ .ant-radio-wrapper {
    margin-right: calc((100vw - 1050px) / 5);
  }
}
</style>
