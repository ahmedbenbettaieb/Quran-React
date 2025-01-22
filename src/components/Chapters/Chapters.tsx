import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
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

    // Map the API response to include `id` and format it properly
    const formattedData = response.data.map(
      (chapter: Chapter, index: number) => ({
        id: index + 1,
        name: chapter.surahName,
        transliteration: chapter.surahNameArabicLong,
        translation: chapter.surahNameTranslation,
        total_verses: chapter.totalAyah,
        type: chapter.revelationPlace,
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

  const columns: ColumnsType<Chapter> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Transliteration",
      dataIndex: "transliteration",
      key: "transliteration",
    },
    {
      title: "Translation",
      dataIndex: "translation",
      key: "translation",
    },
    {
      title: "Total Verses",
      dataIndex: "total_verses",
      key: "total_verses",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={chapters} columns={columns} rowKey="id" />
      )}
    </div>
  );
};

export default Chapters;
