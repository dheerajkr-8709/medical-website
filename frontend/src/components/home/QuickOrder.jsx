import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, MessageCircle, FileText, CheckCircle2, X, Trash2, Send, PhoneCall } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { useLanguage } from '../../contexts/LanguageContext';

const QuickOrder = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const shopNumber = "919113766681";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size too large! Max 5MB allowed.");
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setIsSubmitted(false);
      toast.success("Prescription selected!");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setIsSubmitted(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.success("Image removed.");
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      if (droppedFile.size > 5 * 1024 * 1024) {
        toast.error("File size too large! Max 5MB allowed.");
        return;
      }
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      setIsSubmitted(false);
      toast.success("Prescription dropped!");
    } else {
      toast.error("Please drop an image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please upload an image first.");
    if (!phoneNumber || phoneNumber.length < 10) return toast.error("Please enter a valid phone number.");
    
    setIsSubmitting(true);
    const toastId = toast.loading("Uploading to SHREE RAM MEDICAL...");
    
    try {
      const formData = new FormData();
      formData.append('prescription', file);
      formData.append('phoneNumber', phoneNumber);

      await axios.post('/api/prescriptions/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setIsSubmitted(true);
      toast.success("Prescription submitted successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload failed. Try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = "Hello, I want to order medicines from SHREE RAM MEDICAL.";
    const url = `https://wa.me/${shopNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-emerald-600 rounded-[3rem] p-8 md:p-14 relative overflow-hidden shadow-2xl shadow-emerald-500/20 group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 blur-[80px] rounded-full -ml-32 -mb-32" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/30 text-emerald-50 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
               <Camera size={14} className="animate-pulse" />
               <span>{t('pharmaInfo')}</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight italic uppercase">
              {t('uploadPrescription').split(' ')[0]} <span className="text-emerald-300">{t('uploadPrescription').split(' ')[1]},</span> <br />
              <span className="not-italic text-white/90">{t('readyGuidance')}</span>
            </h2>
            
            <p className="text-emerald-50/80 font-medium max-w-lg leading-relaxed text-lg">
              Our qualified pharmacist will review your prescription and call you within 15 minutes to confirm your order.
            </p>

            <div className="flex flex-col gap-6">
              {!isSubmitted ? (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <label 
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                      className={`relative overflow-hidden bg-white text-emerald-700 px-10 py-5 rounded-[2.5rem] font-black flex items-center gap-4 cursor-pointer transition-all active:scale-95 shadow-2xl shadow-emerald-900/40 group/btn border-4 ${isDragging ? 'border-emerald-300 bg-emerald-50' : 'border-white'}`}
                    >
                      <Upload size={24} className={isDragging ? 'animate-bounce' : ''} />
                      <span className="text-lg uppercase tracking-widest">{file ? t('changePhoto') : t('selectPrescription')}</span>
                      <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>

                    <button 
                      onClick={handleWhatsAppOrder}
                      className="bg-transparent border-2 border-white/30 text-white px-8 py-5 rounded-[2.5rem] font-black flex items-center gap-3 hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
                    >
                      <MessageCircle size={20} />
                      {t('whatsappHelp')}
                    </button>
                  </div>

                  {file && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 max-w-md bg-white/10 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-sm"
                    >
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-emerald-200 uppercase tracking-widest pl-4">{t('pharmaCallInfo')}</label>
                          <input 
                            type="tel" 
                            placeholder="Enter 10-digit mobile number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="w-full bg-white text-emerald-900 px-6 py-4 rounded-3xl font-bold placeholder:text-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
                          />
                       </div>

                       <motion.button 
                        whileHover={{ scale: !isSubmitting ? 1.02 : 1 }}
                        whileTap={{ scale: !isSubmitting ? 0.98 : 1 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`w-full bg-slate-900 text-white px-10 py-5 rounded-3xl font-black flex items-center justify-center gap-4 shadow-2xl transition-all uppercase tracking-widest text-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black'}`}
                      >
                        {isSubmitting ? <div className="w-6 h-6 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /> : <Send size={24} />}
                        {isSubmitting ? 'Submitting...' : t('submitNow')}
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="bg-emerald-500/30 border-2 border-white/20 p-8 rounded-[3rem] flex flex-col items-center md:items-start gap-6 animate-scale-in shadow-3xl">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-full text-emerald-600 shadow-xl"><CheckCircle2 size={40} /></div>
                      <h4 className="text-3xl font-black text-white italic uppercase leading-none">{t('uploadSuccess')}</h4>
                   </div>
                   <p className="text-emerald-50 text-lg font-medium leading-relaxed">{t('uploadSuccessDesc')} <span className="font-black text-white bg-emerald-700/50 px-3 py-1 rounded-lg">+{phoneNumber}</span></p>
                   <button onClick={() => { setIsSubmitted(false); setFile(null); setPreviewUrl(null); setPhoneNumber(""); }} className="text-[10px] font-black text-emerald-200 uppercase tracking-widest border-b border-emerald-400/50 pb-1 hover:text-white transition-colors">{t('submitAnotherPrescription')}</button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-max flex justify-center">
            <div className="relative group/preview">
               <motion.div 
                animate={{ rotate: [0, -2, 2, 0], y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="relative w-[300px] h-[400px] bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] p-5 border-[10px] border-emerald-500/50"
              >
                 <AnimatePresence mode="wait">
                   {previewUrl ? (
                     <motion.div 
                       key="preview"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="w-full h-full relative"
                     >
                       <img src={previewUrl} className="w-full h-full object-cover rounded-[2rem] shadow-inner" alt="Preview" />
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 rounded-[2rem]" />
                       
                       <button 
                         onClick={handleRemoveFile}
                         className="absolute top-4 right-4 bg-rose-500 text-white p-3 rounded-full shadow-xl hover:bg-rose-600 active:scale-90 transition-all z-20 group/del"
                       >
                         <Trash2 size={24} />
                      </button>

                      <div className="absolute bottom-6 left-6 right-6 z-10">
                         <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-1">Uploaded Ready</div>
                         <div className="text-white font-black uppercase text-xs truncate max-w-[200px]">{file.name}</div>
                      </div>
                     </motion.div>
                   ) : (
                     <motion.div 
                       key="placeholder"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="w-full h-full bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 gap-6 p-8"
                     >
                        <Upload size={80} strokeWidth={1} className={isDragging ? 'animate-bounce text-emerald-400' : 'text-slate-200'} />
                        <div className="text-center space-y-2">
                           <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block leading-tight">{t('dropHint')}</span>
                           <span className="text-[9px] font-bold text-slate-300 italic">{t('clickSelectHint')}</span>
                        </div>
                        
                        <div className="w-full space-y-3 pt-4 border-t border-slate-100">
                           <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                           <div className="h-1.5 w-2/3 bg-slate-100 rounded-full" />
                           <div className="h-1.5 w-1/2 bg-slate-100 rounded-full" />
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
                 
                 {/* Doctor Seal Mockup */}
                 <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center text-white border-8 border-white shadow-2xl rotate-12 group-hover/preview:rotate-0 transition-transform duration-500">
                    <div className="text-[10px] font-black uppercase text-center leading-none">TRUSTED<br/>PHARMACY</div>
                 </div>
              </motion.div>
              
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-emerald-400/20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickOrder;
