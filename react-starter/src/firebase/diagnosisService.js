import { 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';
import { signInAnonymously } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

// 匿名認証してユーザーIDを取得
export const getAnonymousUserId = async () => {
  try {
    const auth = getAuth();
    const userCredential = await signInAnonymously(auth);
    return userCredential.user.uid;
  } catch (error) {
    console.error('匿名認証エラー:', error);
    throw error;
  }
};

// 診断データを保存
export const saveDiagnosisData = async (diagnosisData) => {
  try {
    // 匿名認証してユーザーIDを取得
    const userId = await getAnonymousUserId();
    
    // 診断データをFirestoreに保存
    const diagnosisRef = doc(db, 'diagnoses', userId);
    await setDoc(diagnosisRef, {
      userId: userId,
      timestamp: serverTimestamp(),
      diagnosis: {
        type: diagnosisData.type,
        confidence: diagnosisData.confidence,
        answers: diagnosisData.answers || [],
        birthDate: diagnosisData.birthDate || null,
        astrology: diagnosisData.astrology || null,
        fourPillars: diagnosisData.fourPillars || null,
        bagua: diagnosisData.bagua || null
      },
      metadata: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        language: navigator.language || 'ja',
        userAgent: navigator.userAgent
      }
    });
    
    console.log('診断データを保存しました:', userId);
    return userId;
  } catch (error) {
    console.error('診断データ保存エラー:', error);
    throw error;
  }
};

// 診断データを保存（同意済みの場合）
export const saveDiagnosisDataWithConsent = async (diagnosisData, hasConsent) => {
  if (!hasConsent) {
    console.log('データ収集に同意されていないため、保存をスキップします');
    return null;
  }
  
  return await saveDiagnosisData(diagnosisData);
};

