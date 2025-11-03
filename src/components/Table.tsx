
import React, { useState, useEffect } from 'react';
import { DataTable, type DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Loader from './Loader';
import { FaAngleDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Dialog } from 'primereact/dialog';




interface Artwork {
  id?: number;
  title?: string;
  place_of_origin?: string;
  artist_display?: string;
  inscriptions?: string;
  date_start?: number;
  date_end?: number;
}

const Table: React.FC = () => {
  const [artWork, setArtWork] = useState<Artwork[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState<number>(currentPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [rowClick, setRowClick] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [input, setInput] = useState<number | null>(null)


  //api function
  const getData = async (page: number) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${page}`);

      setArtWork(res.data.data);
      // console.log(res)
      // window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }


  // Fetch API data when page changes
  useEffect(() => {
    getData(page);
    setSearchParams({ page: page.toString() });


  }, [page]);

  // Once data changes, restore selection
  useEffect(() => {
    const savedSelectionCount = localStorage.getItem("totalSelectedCount");
    const totalSelectedCount = savedSelectionCount ? Number(savedSelectionCount) : 0;
    // console.log(totalSelectedCount);



    // console.log("artwork length", artWork.length)
    if (totalSelectedCount > 0 && artWork.length > 0) {
      const startIndex = (page - 1) * 12;
      const endIndex = startIndex + 12;

      if (startIndex < totalSelectedCount) {
        const newSelection = artWork.filter((_, idx) => startIndex + idx < totalSelectedCount);
        console.log("newselectionpage", newSelection);
        // Make sure old selection exists and remove duplicates
        const oldSelection = JSON.parse(localStorage.getItem("selectedArtworks") || "[]");
        setSelectedArtworks(newSelection);
        const merged = [
          ...oldSelection,
          ...newSelection.filter(
            n => !oldSelection.some(o => o.id === n.id)
          ),
        ];

        setSelectedArtworks(merged);
        localStorage.setItem("selectedArtworks", JSON.stringify(merged));
      }

      if (totalSelectedCount <= endIndex && totalSelectedCount >= endIndex - 12) {
        localStorage.removeItem("totalSelectedCount");
      }
    }
  }, [artWork, page]);



  // handle paginator prev & next button
  const handlePrev = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  }

  const handleNext = () => {
    setPage(prev => prev + 1)
    window.scrollTo(0, 0);
  }

  // getting selectedArtWork from local storage
  useEffect(() => {
    const saved = localStorage.getItem("selectedArtworks");
    if (saved) setSelectedArtworks(JSON.parse(saved));
  }, []);

  // save selectedArtWork in local storage
  useEffect(() => {
    if (selectedArtworks && selectedArtworks.length > 0) {
      localStorage.setItem("selectedArtworks", JSON.stringify(selectedArtworks));
    } else {
      localStorage.removeItem("selectedArtworks");
    }
  }, [selectedArtworks]);


  const selectionHeader = (
    <button title="Select Rows" className='cursor-pointer text-center flex mr-2' onClick={() => setVisible(!visible)}>
      <FaAngleDown />
    </button>
  );

  const handleSubmit = () => {
    if (!input || input <= 0) return;

    const totalToSelect = input;

    // Save total number user wants to select
    localStorage.setItem("totalSelectedCount", totalToSelect.toString());

    // Calculate how many items belong to this page
    const startIndex = (page - 1) * 12;
    const endIndex = startIndex + 12;

    // Select artworks that fall within totalToSelect limit
    const newSelection = artWork.filter((_, idx) => startIndex + idx < totalToSelect);

    setSelectedArtworks(newSelection);
    localStorage.setItem("selectedArtworks", JSON.stringify(newSelection));

    setVisible(false);
    setInput(null);
  };


  if (loading) {
    return <Loader />
  }

  if (error) {
    return (<div>{error}</div>)
  }



  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎨 Artworks Table</h2>

      {
        visible && (
          <div className="card flex justify-content-center">

            <Dialog header="Enter Number to select rows" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>

              <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(Number(e.target.value))} className='border py-1 rounded-2xl px-4 ' placeholder='Enter any number... ' type="number" />

              <button disabled={!input || input <= 0} onClick={handleSubmit} className='ml-4 rounded-2xl px-4 cursor-pointer py-1 text-white bg-blue-500 active:bg-blue-300 '>Submit</button>
            </Dialog>
          </div>
        )
      }

      <DataTable
        value={artWork}
        loading={loading}
        stripedRows
        showGridlines
        tableStyle={{ minWidth: "70rem" }}
        selectionMode={rowClick ? undefined : 'multiple'} selection={selectedArtworks!}
        onSelectionChange={(e: DataTableSelectionMultipleChangeEvent<Artwork[]>) =>
          setSelectedArtworks(e.value)
        }
      >
        <Column
          header={selectionHeader}
          selectionMode="multiple"
          headerStyle={{ width: "5rem", textAlign: "center" }}
        />

        <Column field="title" header="Title" sortable style={{ width: "20%" }} />
        <Column field="artist_display" header="Artist" sortable style={{ width: "25%" }} />
        <Column field="place_of_origin" header="Origin" sortable style={{ width: "15%" }} />
        <Column field="inscriptions" header="Inscriptions" style={{ width: "30%" }} />
        <Column field="date_start" header="Start" sortable style={{ width: "5%" }} />
        <Column field="date_end" header="End" sortable style={{ width: "5%" }} />
      </DataTable>

      <div className='flex justify-center items-center py-8'>
        <div className='flex max-w-3xl gap-10 text-blue-600'>
          <button onClick={handlePrev} className='cursor-pointer  px-3 py-2 rounded-full hover:bg-blue-50'><FaChevronLeft /></button>

          <div onClick={() => window.scrollTo(0, 0)} className='flex justify-center items-center gap-2'>
            <p className='cursor-pointer px-4 py-2 rounded-full bg-blue-50'>
              {currentPage}</p>
            <p onClick={() => {
              setPage(prev => prev + 1);

            }} className='cursor-pointer px-4 py-2 rounded-full'>
              {currentPage + 1}</p>
            <p onClick={() => setPage(prev => prev + 2)} className='cursor-pointer px-4 py-2 rounded-full'>
              {currentPage + 2}</p>
            <p onClick={() => setPage(prev => prev + 3)} className='cursor-pointer px-4 py-2 rounded-full'>
              {currentPage + 3}</p>
            <p onClick={() => setPage(prev => prev + 4)} className='cursor-pointer px-4 py-2 rounded-full'>
              {currentPage + 4}</p>
          </div>

          <button onClick={handleNext} className='cursor-pointer px-3 py-2 rounded-full hover:bg-blue-50'><FaChevronRight /></button>
        </div>
      </div>
    </div>
  );
}

export default Table;