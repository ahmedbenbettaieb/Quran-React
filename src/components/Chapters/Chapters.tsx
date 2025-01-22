import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chapter } from "../../types/chapter";

const Chapters: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChapters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://quranapi.pages.dev/api/surah.json"
      );

      const formattedData: Chapter[] = response.data.map(
        (chapter: any, index: number) => ({
          id: index + 1,
          surahName: chapter.surahName,
          surahNameArabic: chapter.surahNameArabic,
          surahNameArabicLong: chapter.surahNameArabicLong,
          surahNameTranslation: chapter.surahNameTranslation,
          revelationPlace: chapter.revelationPlace,
          totalAyah: chapter.totalAyah,
        })
      );

      setChapters(formattedData);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="max-w-full overflow-hidden shadow-md rounded-lg">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap sm:px-4"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap sm:px-4"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap sm:px-4"
                    >
                      Arabic Name
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap sm:px-4"
                    >
                      Translation
                    </th>
                    <th
                      scope="col"
                      className="hidden sm:table-cell px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap sm:px-4"
                    >
                      Total Verses
                    </th>
                    <th
                      scope="col"
                      className="hidden sm:table-cell px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap sm:px-4"
                    >
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {chapters.map((chapter) => (
                    <tr
                      key={chapter.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-4">
                        {chapter.id}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-4">
                        {chapter.surahName}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-4 font-arabic">
                        {chapter.surahNameArabic}
                      </td>
                      <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-4">
                        {chapter.surahNameTranslation}
                      </td>
                      <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-4">
                        {chapter.totalAyah}
                      </td>
                      <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-4">
                        {chapter.revelationPlace}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chapters;
