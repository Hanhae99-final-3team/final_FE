const RESP = {
  //POST_APIS
  ADD_POST_SUCCESS: {
    data: {
      itemId: 1,
      title: "간식팔아요",
      content: "남은 간식 팔아요",
      nickname: "멍냥이",
      petCategory: "강아지",
      itemCategory: "식품",
      location: "서울시 강동구~",
      itemImgs: [],
      commentCnt: 12,
      viewCnt: 10,
      zzimCNT: 5,
      purchasePrice: "100,000",
      sellingPrice: "50,000",
      isCompleted: false,
      createdAt: "작성시간",
      modifiedAt: "수정시간",
    },
  },

  ADD_POST_FAIL: {
    message: "게시글 등록에 실패했습니다!",
    result: false,
    data: null,
  },

  GET_POSTS_SUCCESS: {
    message: "게시글 리스트 가져오기에 성공했습니다",
    result: true,
    data: [
      {
        itemId: 1,
        title: "간식팔아요",
        content: "남은 간식 팔아요",
        nickname: "멍냥이",
        petCategory: "강아지",
        itemCategory: "식품",
        location: "서울시 강동구~",
        itemImgs: [],
        commentCnt: 12,
        viewCnt: 10,
        zzimCNT: 5,
        purchasePrice: "100,000",
        sellingPrice: "50,000",
        isCompleted: false,
        createdAt: "작성시간",
        modifiedAt: "수정시간",
      },
      {
        itemId: 2,
        title: "간식팔아요222",
        content: "남은 간식 팔아요222",
        nickname: "멍냥이",
        petCategory: "강아지",
        itemCategory: "식품",
        location: "서울시 강동구~",
        itemImgs: [],
        commentCnt: 12,
        viewCnt: 10,
        zzimCNT: 5,
        purchasePrice: "100,000",
        sellingPrice: "50,000",
        isCompleted: false,
        createdAt: "작성시간",
        modifiedAt: "수정시간",
      },
    ],
  },
  GET_POSTS_FAIL: {
    message: "게시글 리스트 가져오기에 실패했습니다",
    result: false,
    data: null,
  },

  GET_POST_SUCCESS: {
    message: "요청에 성공했습니다",
    result: true,
    data: {
      itemId: 1,
      title: "간식팔아요",
      content: "남은 간식 팔아요",
      nickname: "멍냥이",
      petCategory: "강아지",
      itemCategory: "식품",
      location: "서울시 강동구~",
      itemImgs: [
        "https://t1.daumcdn.net/cfile/tistory/99D87D3E5E09312C17",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0sXkQPoUCEXRUW6PCXKDxgF25Uk_PWFeOfLp5YFIqKxCh-RZvv-nCn-iwoEjHQwv8Ml0&usqp=CAU",
        "https://i.pinimg.com/originals/fa/1b/ed/fa1bed6fbb73192eeae77309c789add5.jpg",
        "https://m.ilbe.com/file/download/105013554",
      ],
      commentCnt: 12,
      viewCnt: 10,
      zzimCnt: 5,
      purchasePrice: "100,000",
      sellingPrice: "50,000",
      isCompleted: false,
      createdAt: "2022-09-01",
      modifiedAt: "수정시간",
    },
  },
};

export default RESP;
