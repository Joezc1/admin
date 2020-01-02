<template>
  <div class="topic-main">
    <div class="topic-header">
      <searchBtns
        :reqData="reqData"
        @handleChange="handleChange"
        :inputBtns="inputBtns"
        :options="options"
        :pickerOptions="pickerOptions"
      ></searchBtns>
    </div>
    <div class="topic-table">
      <el-table :data="tableData" size="medium">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="ID" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布人ID" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.userid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="热度" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.heat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="赞同数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.agree }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.comment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关注数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.follow }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览量" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.brower }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230">
          <div class="btns" slot-scope="scope" fixed="right">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="reqData.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
const searchBtns = () => import("@/components/searchBtns");
// @ is an alias to /src
import * as myAxios from "@/api/topicmanage";
export default {
  name: "home",
  data() {
    return {
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      reqData: {
        pageNo: 1,
        pageSize: 10,
        topicid: null,
        userid: null,
        createtime: null,
        tag: null
      },
      inputBtns: [
        {
          name: "用户ID",
          value: "userid"
        },
        {
          name: "ID",
          value: "topicid"
        }
      ],
      selectedBtns: [
        {
          name: "标签",
          value: "tag",
          data: [
            { id: 0, name: "科技" },
            { id: 1, name: "IT技术" },
            { id: 2, name: "美食" }
          ]
        }
      ],
      tableData: []
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleChange(value) {
      console.log("打印子组件传递的")
      console.log(value);
    },
    handleList() {},
    getTopics() {
      myAxios.getTopics(this.reqData).then(res => {
        console.log(res);
        this.tableData = res.data;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {
    this.getTopics();
  },
  components: {
    searchBtns: searchBtns
  }
};
</script>

<style lang="scss" scoped>
.topic-header {
  padding: 10px 0 20px 10px;
  border-bottom: 1px dashed #ebeef5;
  box-sizing: border-box;
}
.el-pagination {
  padding: 20px 0 0 0;
}
</style>