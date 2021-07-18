<?php

namespace App\Http\Controllers\Admin;

use Exception;
use ReflectionClass;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use TCG\Voyager\Facades\Voyager;
use Illuminate\Support\Facades\DB;
use TCG\Voyager\Events\BreadAdded;
use TCG\Voyager\Database\Types\Type;
use TCG\Voyager\Events\BreadDeleted;
use TCG\Voyager\Events\BreadUpdated;
use TCG\Voyager\Database\Schema\Table;
use TCG\Voyager\Database\Schema\SchemaManager;
use App\Http\Controllers\Voyager\VoyagerBreadController;

class ProductController extends VoyagerBreadController
{
    public function index()
    {
        $this->authorize('browse_bread');

        $dataTypes = Voyager::model('DataType')->select('id', 'name', 'slug')->get()->keyBy('name')->toArray();

        $tables = array_map(function ($table) use ($dataTypes) {
            $table = Str::replaceFirst(DB::getTablePrefix(), '', $table);

            $table = [
                'prefix'     => DB::getTablePrefix(),
                'name'       => $table,
                'slug'       => $dataTypes[$table]['slug'] ?? null,
                'dataTypeId' => $dataTypes[$table]['id'] ?? null,
            ];

            return (object) $table;
        }, SchemaManager::listTableNames());

        return Voyager::view('voyager::tools.bread.index')->with(compact('dataTypes', 'tables'));
    }
}
