import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// ランダムなシェアIDを生成
export const generateShareId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// シェアデータを作成
export const createShare = async (shareId, userData) => {
  try {
    const ref = doc(db, 'shares', shareId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      // 既存なら上書きせず、必要なフィールドのみ更新（feedbacksは保持）
      await setDoc(ref, {
        userId: shareId,
        type: userData.type,
        name: userData.name,
        zodiac: userData.zodiac,
        title: userData.title,
        longMessage: userData.longMessage,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } else {
      // 新規作成
      await setDoc(ref, {
        userId: shareId,
        type: userData.type,
        name: userData.name,
        zodiac: userData.zodiac,
        title: userData.title,
        longMessage: userData.longMessage,
        createdAt: serverTimestamp(),
        feedbacks: []
      });
    }
    return shareId;
  } catch (error) {
    console.error('シェア作成エラー:', error);
    throw error;
  }
};

// 感想を追加
export const addFeedback = async (shareId, feedbackText) => {
  try {
    const shareRef = doc(db, 'shares', shareId);
    await updateDoc(shareRef, {
      feedbacks: arrayUnion({
        text: feedbackText,
        timestamp: new Date().toISOString()
      })
    });
    return true;
  } catch (error) {
    console.error('感想追加エラー:', error);
    throw error;
  }
};

// シェアデータを取得
export const getShare = async (shareId) => {
  try {
    const shareDoc = await getDoc(doc(db, 'shares', shareId));
    if (shareDoc.exists()) {
      return shareDoc.data();
    }
    return null;
  } catch (error) {
    console.error('シェア取得エラー:', error);
    throw error;
  }
};

// リアルタイムで感想を監視
export const subscribeToFeedbacks = (shareId, callback) => {
  const shareRef = doc(db, 'shares', shareId);
  return onSnapshot(shareRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.feedbacks || []);
    }
  });
};

