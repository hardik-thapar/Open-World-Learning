import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { courses } from '../../data/courses';
import { CourseCompletion } from '../../types/courseTypes';
import { isCourseCompleted } from '../../utils/courseUtils';

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [course, setCourse] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (id && typeof id === 'string') {
      const foundCourse = courses.find(c => c.id === id);
      if (foundCourse) {
        setCourse(foundCourse);
        // Check completion status when course is found
        setIsCompleted(isCourseCompleted(id));
      } else {
        router.push('/courses');
      }
    }
  }, [id, router]);

  useEffect(() => {
    if (typeof window !== 'undefined' && id) {
      try {
        const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
        // setIsCompleted(!!completedCourses[id]);
        console.log(completedCourses);
      } catch (error) {
        console.error('Error checking course completion:', error);
        setIsCompleted(false);
      }
    }
  }, [id]);

  if (!isClient || !course) {
    return <div>Loading...</div>;
  }

  const handleVideoEnd = () => {
    setVideoCompleted(true);
  };

  const generateCertificate = async () => {
    if (!course.isPaid) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // Load certificate template
      const template = new Image();
      template.src = course.certificateTemplate;
      
      await new Promise((resolve, reject) => {
        template.onload = resolve;
        template.onerror = reject;
      });

      // Set canvas dimensions to match template
      canvas.width = template.width;
      canvas.height = template.height;

      // Draw template
      ctx.drawImage(template, 0, 0);

      // Configure text style
      ctx.font = 'bold 60px Arial';
      ctx.fillStyle = '#333333';
      ctx.textAlign = 'center';

      // Add course completion text
      const completionDate = new Date().toLocaleDateString();
      ctx.fillText(course.title, canvas.width / 2, canvas.height / 2 - 50);
      ctx.font = '40px Arial';
      ctx.fillText(`Completed on ${completionDate}`, canvas.width / 2, canvas.height / 2 + 50);

      // Convert canvas to URL
      const certificateDataUrl = canvas.toDataURL('image/png');
      setCertificateUrl(certificateDataUrl);

      return certificateDataUrl;
    } catch (error) {
      console.error('Error generating certificate:', error);
      return null;
    }
  };

  const downloadCertificate = async () => {
    const certificateDataUrl = certificateUrl || await generateCertificate();
    
    if (certificateDataUrl) {
      const link = document.createElement('a');
      link.href = certificateDataUrl;
      link.download = `${course.title}-Certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Failed to generate certificate. Please try again.');
    }
  };

  const downloadVideo = () => {
    // Implement video download functionality
    // This is a placeholder function
    const link = document.createElement('a');
    link.href = course.videoUrl;
    link.download = `${course.title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCourseCompletion = (checked: boolean) => {
    if (typeof window === 'undefined' || !id) return;

    try {
      const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
      
      if (checked) {
        // Mark course as completed
        if(typeof id == 'string')
        completedCourses[id] = true;
      } else {
        // Remove course from completed list
        if(typeof id == 'string')
        delete completedCourses[id];
      }

      localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
      
      // Update badges if needed
      const completedCount = Object.keys(completedCourses).length;
      const userBadges = {
        beginnerBadge: completedCount >= 2,
        intermediateBadge: completedCount >= 4
      };
      localStorage.setItem('userBadges', JSON.stringify(userBadges));
      
      // Force a re-render
      setIsCompleted(checked);
    } catch (error) {
      console.error('Error updating course completion:', error);
    }
  };

  return (
    <div style={{
      background: "linear-gradient(145deg, #050505, #130A2A, #0A1229)",
      color: "#F5F5F5",
      minHeight: "100vh",
      padding: "40px",
    }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "rgba(19, 10, 42, 0.9)",
          borderRadius: "24px",
          padding: "40px",
          border: "1px solid rgba(124, 58, 237, 0.2)",
        }}
      >
        <Link href="/courses" style={{
          color: "#BB86FC",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: "20px",
        }}>
          ← Back to Courses
        </Link>

        <h1 style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          background: "linear-gradient(135deg, #FFFFFF, #BB86FC)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          {course.title}
        </h1>

        <div style={{ marginBottom: "30px" }}>
          <p style={{ fontSize: "1.2rem", color: "#E0E0E0" }}>{course.description}</p>
          <div style={{ marginTop: "20px", color: "#BB86FC" }}>
            <p>Duration: {course.duration}</p>
            <p>Instructor: {course.instructor}</p>
          </div>
        </div>

        {course.videoUrl && (
          <div style={{
            marginTop: "2rem",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            <video 
              controls
              width="100%"
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <source src={course.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <div style={{ marginBottom: "40px" }}>
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            marginTop: '20px',
            justifyContent: 'center' 
          }}>
            <button
              onClick={downloadVideo}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Download Video
            </button>

            {course.isPaid && videoCompleted && (
              <motion.button
                onClick={downloadCertificate}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: "10px 20px",
                  background: "linear-gradient(135deg, #059669, #10B981)",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>Download Certificate</span>
                {certificateUrl && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </motion.button>
            )}

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginTop: '20px',
              flexDirection: 'column'  // Changed to column for better layout
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#E0E0E0',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}>
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => handleCourseCompletion(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#10B981'  // Added for better visibility
                    }}
                  />
                  Mark as Completed
                </label>
              </div>
              {isCompleted && (
                <div style={{
                  color: '#10B981',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 12px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '8px'
                }}>
                  <span>✓</span>
                  Course Completed
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}