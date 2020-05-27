<template>
  <div class="newsList ios-paddingBottom" ref="newsList">
    <div class="newsListCell" v-for="item in newsList" :key="item.uniquekey">
      <div v-if="item.thumbnail_pic_s02" @click="toNewsDetails(item.url)">
        <div class="cell_title">{{item.title}}</div>
        <div class="cell_img">
          <div>
            <van-image lazy-load :src="item.thumbnail_pic_s" />
          </div>
          <div>
            <van-image lazy-load :src="item.thumbnail_pic_s02" />
          </div>
          <div>
            <van-image lazy-load :src="item.thumbnail_pic_s03" />
          </div>
        </div>
        <div class="cell_floor">{{item.author_name}}&nbsp;&nbsp;{{item.date}}</div>
      </div>
      <div v-else @click="toNewsDetails(item.url)">
        <div class="cell_to">
          <div class="to_title">{{item.title}}</div>
          <div class="to_img">
            <van-image lazy-load :src="item.thumbnail_pic_s" />
          </div>
        </div>
        <div class="cell_floor">{{item.author_name}}&nbsp;&nbsp;{{item.date}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import jsonp from "jsonp";
export default {
  name: "newsList",
  data() {
    return {
      weizhi: 0,
      newsList: [
      ]
    };
  },
  activated() {
    this.$refs.newsList.scrollTop = this.weizhi;
  },
  deactivated() {
    this.weizhi = this.$refs.newsList.scrollTop;
  },
  created() {
    this.getData();
  },
  methods: {
    toNewsDetails(url) {
      window.location.href = url;
    },
    getData() {
      this.$http
      .get('/juhenew/toutiao/index?type=top&key=df05df0ad31f5794e2dc1bd3cbf4e0f1')
      .then(
        res => {
            console.log(res);
            if (res.error_code === 0) {
                this.newsList = res.result.data
            }
        },
        () => {
        }
      )

    //   jsonp("https://api.jisuapi.com/news/get?channel=头条&start=0&num=40&appkey=dcff85f20af11b47", (data) => {
    //       console.log(data)
    //     this.newsList = data.result.list
    //   });
    }
  }
};
</script>
<style lang="scss">
.newsList {
  padding: 0 15px;
  .newsListCell {
    text-align: left;
    border-bottom: 1px solid #eee;
    padding: 12px 0;
    background-color: #feffff;
    .van-image {
      width: 100%;
    }
    .cell_title {
      font-size: 17px;
    }
    .cell_img {
      display: flex;
      padding: 5px 0;
      > div {
        flex: 1;
        .van-image {
          min-height: 87px;
        }
        + div {
          margin-left: 5px;
        }
      }
    }
    .cell_floor {
      color: #828384;
      font-size: 11px;
    }

    .cell_to {
      display: flex;
      .to_title {
        flex: 1;
        font-size: 17px;
      }
      .to_img {
        width: 112px;
      }
    }
  }
}
</style>

