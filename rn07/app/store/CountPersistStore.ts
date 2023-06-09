import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

interface CountState {
  count: number;
  increase: () => void;
}

interface UserInfoState { //user 정보 타입 선언
  mt_id : string;
  mt_pw : string;
  updateUserInfo : (userInfo:{mt_id : string, mt_pw : string}) => void;
  deleteUserInfo : () => void;
}

const useCountPersistStore = create<CountState>()(
  persist( //persist 선언
    (set, get) => ({ 
      count: 0, //persist 내부 state 선언
      increase: () => set({count: get().count + 1}), //내부 state를 수정할 수 있는 
    }),
    {
      name: 'count-storage', //AsyncStorage에 저장시킬 이름을 입력해줍니다.
      storage: createJSONStorage(() => AsyncStorage), //Storage위치는 AsyncStorage를 참조시킵니다.
    },
  ),
);

const useUserInfoPersistStore = create<UserInfoState>()(
  persist(
    (set,get) => ({
      mt_id : '',
      mt_pw : '',
      updateUserInfo : (userInfo) => set({mt_id : userInfo.mt_id, mt_pw : userInfo.mt_pw}),
      deleteUserInfo : () => set({mt_id : '' , mt_pw : ''}),
    }),
    {
      name : 'userinfo-storage',
      storage: createJSONStorage(()=>AsyncStorage),
    }
  )
)

export {useCountPersistStore,useUserInfoPersistStore};
