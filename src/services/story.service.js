
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

export const storyService = {
  query,
  getById,
  save,
  remove,
  getEmptyStory,
  onRemoveStoryComment,
  saveLike,
  createComment
}
const STORAGE_KEY = 'story'
const curStories = utilService.loadFromStorage(STORAGE_KEY)
if(!curStories){
  _createSrories()
}
window.ss = storyService



function onRemoveStoryComment(storyId) {
  return storageService.remove(STORAGE_KEY, storyId)
}

async function query() {
  
  try {
    let stories = await storageService.query(STORAGE_KEY)
    return stories.reverse() // TODO: ADD FILTER BY!
  } catch (err) {
    console.log(err)
    throw err
  }
}

function getById(storyId) {
  return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
  await storageService.remove(STORAGE_KEY, storyId)
}


async function save(story) {
  var savedStory
  if (story._id) {
    savedStory = await storageService.put(STORAGE_KEY, story)

  } else {
    const user = userService.getLoggedinUser()
    console.log(story)
    story.by = {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      imgUrl: user.imgUrl,
    }
    story.upload_time = new Date()
    savedStory = await storageService.post(STORAGE_KEY, story)
  }
  console.log(savedStory)
  return savedStory
}

async function saveLike(story) {
  var savedStory = await storageService.put(STORAGE_KEY, story)
  return savedStory
}

function createComment(txt, user) {
  return {
    id: _makeId(),
    by: {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      imgUrl: user.imgUrl
    },
    txt
  }
}

function _makeId(length = 4) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function getEmptyStory() {
  return {
    // _id: "",
    txt: "",
    imgUrl: [],
    comments: [],
    likedBy: [],
    by: {
      _id: "",
      username: "",
      fullname: "",
      imgUrl: ""
    },
  }
}

function _createSrories() {
  console.log("_createSrories")
  const story = [
    {
      _id: "s104",
      txt: "This is our reality.",
      upload_time:"2024-04-01T15:03:31.000Z",
      imgUrl: ["https://media.istockphoto.com/id/2003347922/photo/friends-with-tradition-rural-hat-walking-at-beautiful-rice-field-landscape-in-bali.jpg?s=1024x1024&w=is&k=20&c=3Ov4E5kxMH9PsELdIWVF6ypanrdKn1alLXlsym6tfZk=", "https://media.istockphoto.com/id/2074989507/photo/friends-with-tradition-rural-hat-walking-at-beautiful-rice-field-landscape-in-bali.jpg?s=1024x1024&w=is&k=20&c=VrNu3vVBv-PcY7LBlOyTrDyHDhnxv0oxld7Av_8Wvx4=", "https://media.istockphoto.com/id/2074989516/photo/friends-with-tradition-rural-hat-walking-at-beautiful-rice-field-landscape-in-bali.jpg?s=1024x1024&w=is&k=20&c=h0wRpXl0O46Na9iRM9tKgzqD0er6SWFKtGrReUx7oD8="],
      by: {
        _id: "a101",
        fullname: "Barbara Bedene",
        username: "barb1996",
        imgUrl: "https://i.pinimg.com/564x/b8/62/bd/b862bd469311278a01be5007d7d2c957.jpg"
      },
      comments: [
        {
          id: "c1005",
          by: {
            _id: "a102",
            username: "ofirid",
            fullname: "Ofir Danan",
            imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
          },

          txt: "good one!",

          likedBy: [
            {
              _id: "a102",
              username: "ofirid",
              fullname: "Ofir Danan",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            }
          ]
        }, {
          id: "c1001",
          by: {
            _id: "a104",
            username: "miniMe777",
            fullname: "Reilly Danan",
            imgUrl: "https://st2.depositphotos.com/3143277/8644/i/600/depositphotos_86446164-stock-photo-business-man-in-office.jpg"
          },

          txt: "very nice!",

          likedBy: [
            {
              _id: "a102",
              username: "ofirid",
              fullname: "Ofir Danan",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "a103",
            username: "noamdan01",
            fullname: "Noam Danan",
            imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          txt: "not good!"
        }
      ],

      likedBy: [
        {
          _id: "a111",
          fullname: "Michal Jackson",
          username: "mjack",
          imgUrl: "https://i.pinimg.com/280x280_RS/52/97/74/52977407847a9767757d40bb93644b58.jpg"
        },

        {
          _id: "a103",
          fullname: "Noam Danan",
          username: "noamdan01",
          imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

        {
          _id: "7zLay",
          fullname: "Ilan Burla",
          username: "ilanbur",
          imgUrl: "https://media.istockphoto.com/id/1214729864/photo/young-casual-man-portrait-isolated-on-yellow-background.jpg?s=1024x1024&w=is&k=20&c=SKhmfNS3tqyLHpPZ1rSMfN1_WKH21wwYtikTmkz4Bec="
        }
      ]
    },
    {
      _id: "s108",
      txt: "Your reaction? 😍",
      upload_time:"2024-04-05T15:03:31.000Z",
      imgUrl: ["https://57hours.com/wp-content/uploads/2022/11/classic-tour-du-mont-blanc-guided-trek.jpg","https://57hours.com/wp-content/uploads/2022/12/mont-blanc-reflection-sunset.jpg","https://57hours.com/wp-content/uploads/2022/12/tmb-ascending-hill.jpg"],
      by: {
        _id: "u109",
        fullname: "57hours",
        username: "57hours_app",
        imgUrl: "https://cdn.knoji.com/images/logo/57hours.jpg?aspect=center&trim=true&flatten=true&width=50&height=50"
      },
      comments: [
        {
          id: "c1001",
          by: {
            _id: "a102",
            fullname: "Ofir Danan",
            username: "ofirid",
            imgUrl: "https://media.istockphoto.com/id/1476195033/photo/happy-young-man-smiling-and-looking-away-in-yellow-studio.jpg?s=2048x2048&w=is&k=20&c=K4utqv8tVZJrF8MCods2zp0t3C-ZObqhibttXupryzQ="
          },

          txt: "When can we leave?",

          likedBy: [
            {
              _id: "a102",
              fullname: "Ofir Danan",
              username: "ofirid",
              imgUrl: "https://media.istockphoto.com/id/1476195033/photo/happy-young-man-smiling-and-looking-away-in-yellow-studio.jpg?s=2048x2048&w=is&k=20&c=K4utqv8tVZJrF8MCods2zp0t3C-ZObqhibttXupryzQ="
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "a103",
            fullname: "Noam Danan",
            username: "noamdan01",
            imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          txt: "Yalla!"
        }
      ],

      likedBy: [
        {
          _id: "a102",
          username: "ofirid",
          fullname: "Ofir Danan",
          imgUrl: "https://media.istockphoto.com/id/1476195033/photo/happy-young-man-smiling-and-looking-away-in-yellow-studio.jpg?s=2048x2048&w=is&k=20&c=K4utqv8tVZJrF8MCods2zp0t3C-ZObqhibttXupryzQ="
        },

        {
          _id: "a103",
          fullname: "Noam Danan",
          username: "noamdan01",
          imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ]
    },
    {
      _id: "s105",
      txt: "It’s officially Pizza Picnic season! ✨",
      upload_time:"2024-04-12T15:03:31.000Z",
      imgUrl: [ "https://www.southernliving.com/thmb/j_6gABRIAMegN6RFHxOgbUqBxjA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg"],
      by: {
        _id: "seller1",
        fullname: "The Little Sister Pizza",
        username: "lilsispizza",
        imgUrl: "https://media.easy.co.il/images/UserThumbs/10059190_1689584843549.png"
      },
      comments: [
        {
          id: "c1005",
          by: {
            _id: "a102",
            username: "ofirid",
            fullname: "Ofir Danan",
            imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
          },

          txt: "אלוהים אדירים ,   בא לי ממש !",

          likedBy: [
            {
              _id: "a102",
              username: "ofirid",
              fullname: "Ofir Danan",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",

            },

            {
              _id: "a113",
              username: "shiroson",
              fullname: "Shiri Danan",
              imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
            },

            {
              _id: "u101",
              username: "bar_bat_001",
              fullname: "Bat ChenChen",
              imgUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }

          ]
        },

        {
          id: "c1001",
          by: {
            _id: "a102",
            username: "ofirid",
            fullname: "Ofir Danan",
            imgUrl: "https://st2.depositphotos.com/3143277/8644/i/600/depositphotos_86446164-stock-photo-business-man-in-office.jpg"
          },

          txt: "very nice!",

          likedBy: [
            {
              _id: "a102",
              username: "ofirid",
              fullname: "Ofir Danan",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            },
            {
              _id: "u101",
              username: "bar_bat_001",
              fullname: "Bat ChenChen",
              imgUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "a103",
            username: "noamdan01",
            fullname: "Noam Danan",
            imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          txt: "This sale is on fire , keep this spirit"
        }
      ],

      likedBy: [
        {
          _id: "a111",
          fullname: "Michal Jackson",
          username: "mjack",
          imgUrl: "https://i.pinimg.com/280x280_RS/52/97/74/52977407847a9767757d40bb93644b58.jpg"
        },

        {
          _id: "a103",
          fullname: "Noam Danan",
          username: "noamdan01",
          imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

        {
          _id: "7zLay",
          fullname: "Ilan Burla",
          username: "ilanbur",
          imgUrl: "https://media.istockphoto.com/id/1214729864/photo/young-casual-man-portrait-isolated-on-yellow-background.jpg?s=1024x1024&w=is&k=20&c=SKhmfNS3tqyLHpPZ1rSMfN1_WKH21wwYtikTmkz4Bec="
        },
        {
          _id: "u101",
          username: "bar_bat_001",
          fullname: "Bat ChenChen",
          imgUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }

      ]
    },
    {
      _id: "s106",
      txt: "worldwide shipping",
      upload_time:"2024-04-22T15:03:31.000Z",
      imgUrl: ["https://www.dior.com/couture/var/dior/storage/images/pushs-editos/folder-cruise-23-femme2/folder-prelaunch/m9334utzqm928/38188347-1-eng-GB/m9334utzqm928_1440_1200.png",
        "https://cdn.cliqueinc.com/posts/295126/best-dior-bags-295126-1658183714371-main.700x0c.jpg",
        "https://www.dior.com/couture/var/dior/storage/images/pushs-editos/folder-cruise-23-femme2/m1286zmdwm884/38149056-1-eng-GB/m1286zmdwm884_1440_1200.jpg"],
      by: {
        _id: "seller2",
        fullname: "myibags",
        username: "myibags",
        imgUrl: "https://assets.vogue.com/photos/615347cdd43372473562f36d/4:3/w_939,h_704,c_limit/1216-VO-WELL27-02.jpg"
      },
      comments: [
        {
          id: "c1005",
          by: {
            _id: "a102",
            username: "ofirid",
            fullname: "Ofir Danan",
            imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
          },

          txt: "good one!",

          likedBy: [
            {
              _id: "a102",
              username: "ofirid",
              fullname: "Ofir Danan",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            }
          ]
        }, {
          id: "c1001",
          by: {
            _id: "a102",
            username: "ofirid",
            fullname: "Ofir Danan",
            imgUrl: "https://st2.depositphotos.com/3143277/8644/i/600/depositphotos_86446164-stock-photo-business-man-in-office.jpg"
          },

          txt: "very nice!",

          likedBy: [
            {
              _id: "a102",
              username: "ofirid",
              fullname: "Ofir Danan",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "a103",
            username: "noamdan01",
            fullname: "Noam Danan",
            imgUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          },
          txt: "not good!"
        }
      ],

      likedBy: [
        {
          _id: "a111",
          fullname: "Michal Jackson",
          username: "mjack",
          imgUrl: "https://i.pinimg.com/280x280_RS/52/97/74/52977407847a9767757d40bb93644b58.jpg"
        },

        {
          _id: "a113",
          username: "shiroson",
          fullname: "Shiri Danan",
          imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
        },

        {
          _id: "7zLay",
          fullname: "Ilan Burla",
          username: "ilanbur",
          imgUrl: "https://media.istockphoto.com/id/1214729864/photo/young-casual-man-portrait-isolated-on-yellow-background.jpg?s=1024x1024&w=is&k=20&c=SKhmfNS3tqyLHpPZ1rSMfN1_WKH21wwYtikTmkz4Bec="
        }
      ]
    },
    {
      _id: "s107",
      txt: "Nice",
      "upload_time":"2024-04-23T15:03:31.000Z",
      imgUrl: ["https://www.chanel.com/images//t_one///q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1240/j12-watch-caliber-12-2-33-mm-black-silver-black-ceramic-steel-diamond-packshot-default-h9742-9538993422366.jpg"],
      by: {
        _id: "seller3",
        fullname: "chanelofficial",
        username: "chanelofficial",
        imgUrl: "https://logos-world.net/wp-content/uploads/2020/04/Chanel-Logo.png"
      },
      comments: [
        {
          id: "c1005",
          by: {
            _id: "a102",
            username: "ofirid",
            fullname: "Ofir Danan",
            imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
          },

          txt: "good one!",

          likedBy: [
            {
              _id: "a102",
              username: "ofirid",
              fullname: "Ofir Danan",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            }
          ]
        }, {
          id: "c1001",
          by: {
            _id: "a102",
            username: "ofirid",
            fullname: "Ofir Danan",
            imgUrl: "https://st2.depositphotos.com/3143277/8644/i/600/depositphotos_86446164-stock-photo-business-man-in-office.jpg"
          },

          txt: "very nice!",

          likedBy: [
            {
              _id: "a102",
              username: "ofirid",
              fullname: "Ofir Danan",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            },
            {
              _id: "u101",
              username: "bar_bat_001",
              fullname: "Bat ChenChen",
              imgUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "a103",
            username: "noamdan01",
            fullname: "Noam Danan",
            imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          txt: "not good!"
        }
      ],

      likedBy: [
        {
          _id: "a111",
          fullname: "Michal Jackson",
          username: "mjack",
          imgUrl: "https://i.pinimg.com/280x280_RS/52/97/74/52977407847a9767757d40bb93644b58.jpg"
        },

        {
          _id: "a103",
          fullname: "Noam Danan",
          username: "noamdan01",
          imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

        {
          _id: "7zLay",
          fullname: "Ilan Burla",
          username: "ilanbur",
          imgUrl: "https://media.istockphoto.com/id/1214729864/photo/young-casual-man-portrait-isolated-on-yellow-background.jpg?s=1024x1024&w=is&k=20&c=SKhmfNS3tqyLHpPZ1rSMfN1_WKH21wwYtikTmkz4Bec="
        }
      ]
    },
    {
      "_id": "s109",
      "txt": "Herzelia 5k",
      "upload_time":"2024-05-01T15:03:31.000Z",
      "imgUrl": [
          "https://res.cloudinary.com/dpb75oqpv/image/upload/v1715009778/Insta-uploads/obz5fqqlj2cvt6sow4uf.jpg"
      ],
      "by": {
        "_id": "3110",
        "username": "shirid",
        "fullname": "Shiri Hameiri",
        "imgUrl": "https://i.pinimg.com/564x/31/44/48/31444808f81fcacc1fb91bf32d3f77ec.jpg"
      },
        "comments": [],
        "likedBy": [],
    },{
      "_id": "s110",
        "txt": "Thailand",
        "upload_time":"2024-05-03T15:03:31.000Z",
        "imgUrl": [
            "https://res.cloudinary.com/dpb75oqpv/image/upload/v1715013322/Insta-uploads/tc9jixhwnvctorgzx0yq.jpg"
        ],
        "comments": [],
        "likedBy": [],
        "by": {
            "_id": "3110",
            "username": "shirid",
            "fullname": "Shiri Hameiri",
            "imgUrl": "https://i.pinimg.com/564x/31/44/48/31444808f81fcacc1fb91bf32d3f77ec.jpg"
        }
    },
    {
      "_id": "s111",
        "txt": "My next destination 🙌",
        "upload_time":"2024-05-04T15:03:31.000Z",
        "imgUrl": [
            "https://res.cloudinary.com/dpb75oqpv/image/upload/v1715013451/Insta-uploads/ypwwyrmipvhwoyd3sygm.jpg"
        ],
        "comments": [],
        "likedBy": [],
        "by": {
            "_id": "3110",
            "username": "shirid",
            "fullname": "Shiri Hameiri",
            "imgUrl": "https://i.pinimg.com/564x/31/44/48/31444808f81fcacc1fb91bf32d3f77ec.jpg"
        }
    },
    {
      "_id": "s112",
        "txt": "The power of ZEN🧘‍♀️",
        "upload_time":"2024-05-05T15:03:31.000Z",
        "imgUrl": [
            "https://res.cloudinary.com/dpb75oqpv/image/upload/v1715013578/Insta-uploads/djf7rddmkiyd4zwwkgqa.avif"
        ],
        "comments": [],
        "likedBy": [],
        "by": {
            "_id": "3110",
            "username": "shirid",
            "fullname": "Shiri Hameiri",
            "imgUrl": "https://i.pinimg.com/564x/31/44/48/31444808f81fcacc1fb91bf32d3f77ec.jpg"
        }
    }


  ]
  utilService.saveToStorage(STORAGE_KEY, story)

}


